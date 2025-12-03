import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { contactFormSchema, insertBlogPostSchema, insertEventSchema, insertRsvpSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth, isAuthenticated, isAdmin } from "./auth";
import { storage } from "./storage";
import { sendRegistrationEmails, generateRegistrationRef } from "./email-service";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login error" });
        }
        const { password, ...userWithoutPassword } = user;
        return res.json({ user: userWithoutPassword });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout error" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", isAuthenticated, async (req, res) => {
    const user = req.user as any;
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.post("/api/auth/init-admin", async (req, res) => {
    try {
      const initToken = req.headers["x-init-token"];
      if (initToken !== process.env.ADMIN_INIT_TOKEN) {
        return res.status(403).json({ error: "Invalid initialization token" });
      }

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }

      const existingAdmin = await storage.getUserByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.default.hash(password, 10);

      await storage.createUser({
        email,
        username: email.split("@")[0],
        password: hashedPassword,
        isAdmin: true,
      });

      res.json({ success: true, message: "Admin user created successfully." });
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ error: "Failed to create admin user" });
    }
  });

  app.get("/api/blog-posts", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const posts = await storage.getAllBlogPosts(status);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.get("/api/blog-posts/slug/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create blog post" });
      }
    }
  });

  app.patch("/api/blog-posts/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.updateBlogPost(id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const events = await storage.getAllEvents(status);
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.get("/api/events/slug/:slug", async (req, res) => {
    try {
      const event = await storage.getEventBySlug(req.params.slug);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/events", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(data);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid event data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create event" });
      }
    }
  });

  app.patch("/api/events/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.updateEvent(id, req.body);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteEvent(id);
      if (!success) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  app.get("/api/events/:id/rsvps", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const rsvps = await storage.getRsvpsByEvent(eventId);
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
      res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
  });

  app.post("/api/rsvps", async (req, res) => {
    const startTime = Date.now();
    const registrationRef = generateRegistrationRef();
    
    console.log(`[REGISTRATION] New registration attempt started - Ref: ${registrationRef}`);
    
    try {
      const data = insertRsvpSchema.parse(req.body);
      
      console.log(`[REGISTRATION] ${registrationRef} - Validating event ID: ${data.eventId}`);
      
      const event = await storage.getEvent(data.eventId);
      if (!event) {
        console.log(`[REGISTRATION] ${registrationRef} - Event not found: ${data.eventId}`);
        return res.status(404).json({ 
          success: false,
          error: "Event not found",
          message: "The event you're trying to register for doesn't exist or is no longer available."
        });
      }
      
      console.log(`[REGISTRATION] ${registrationRef} - Saving registration for: ${data.name} (${data.email})`);
      
      const rsvp = await storage.createRsvp({
        ...data,
        registrationRef,
      });
      
      console.log(`[REGISTRATION] ${registrationRef} - Registration saved successfully, ID: ${rsvp.id}`);
      
      console.log(`[REGISTRATION] ${registrationRef} - Sending confirmation emails...`);
      const emailResult = await sendRegistrationEmails(rsvp, event);
      
      const processingTime = Date.now() - startTime;
      console.log(`[REGISTRATION] ${registrationRef} - Completed in ${processingTime}ms`);
      
      if (!emailResult.registrantEmailSent && !emailResult.ownerEmailSent) {
        console.warn(`[REGISTRATION] ${registrationRef} - All emails failed to send`);
        return res.status(201).json({
          success: true,
          message: "Registration saved successfully. We couldn't send the confirmation email, but your registration is confirmed.",
          registrationRef: rsvp.registrationRef,
          rsvp: {
            id: rsvp.id,
            name: rsvp.name,
            email: rsvp.email,
            attendees: rsvp.attendees,
            eventTitle: event.title,
            eventDate: event.eventDate,
            location: event.location,
          },
          emailStatus: {
            registrantEmailSent: false,
            ownerEmailSent: false,
            note: "Confirmation email delivery failed. Please contact info@omastalo.co.za if you don't receive it.",
          }
        });
      }
      
      res.status(201).json({
        success: true,
        message: "Registration confirmed! A confirmation email has been sent to your email address.",
        registrationRef: rsvp.registrationRef,
        rsvp: {
          id: rsvp.id,
          name: rsvp.name,
          email: rsvp.email,
          attendees: rsvp.attendees,
          eventTitle: event.title,
          eventDate: event.eventDate,
          location: event.location,
        },
        emailStatus: {
          registrantEmailSent: emailResult.registrantEmailSent,
          ownerEmailSent: emailResult.ownerEmailSent,
        }
      });
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error(`[REGISTRATION] ${registrationRef} - Failed after ${processingTime}ms:`, error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          error: "Invalid registration data",
          message: "Please check your form entries and try again.",
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      
      res.status(500).json({ 
        success: false,
        error: "Registration failed",
        message: "We couldn't process your registration. Please try again or contact info@omastalo.co.za for assistance."
      });
    }
  });

  app.post("/api/send-mail", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);

      const ZEPTO_API_KEY = process.env.ZEPTOMAIL_API_KEY;
      const ZEPTO_FROM_EMAIL = process.env.ZEPTOMAIL_FROM_EMAIL;

      if (!ZEPTO_API_KEY || !ZEPTO_FROM_EMAIL) {
        throw new Error("ZeptoMail credentials not configured");
      }

      const adminEmailPayload = {
        from: {
          address: ZEPTO_FROM_EMAIL,
        },
        to: [
          {
            email_address: {
              address: "info@omastalo.co.za",
            },
          },
        ],
        subject: `New Contact Form Submission: ${data.subject}`,
        htmlbody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0D1B2A; border-bottom: 3px solid #C9A227; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin: 20px 0;">
              <p><strong>From:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #C9A227; margin-top: 10px;">
                ${data.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
              This message was sent from the OMASTALO contact form at www.omastalo.co.za
            </p>
          </div>
        `,
      };

      const userConfirmationPayload = {
        from: {
          address: ZEPTO_FROM_EMAIL,
        },
        to: [
          {
            email_address: {
              address: data.email,
            },
          },
        ],
        subject: "Thank You for Contacting OMASTALO",
        htmlbody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0D1B2A; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">OMASTALO</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">
                Organization for Mathematics, Statistics & Life Orientation
              </p>
            </div>
            <div style="padding: 30px; background-color: #fff;">
              <h2 style="color: #0D1B2A; margin-top: 0;">Hello ${data.name},</h2>
              <p style="color: #333; line-height: 1.6;">
                Thank you for reaching out to OMASTALO. We have received your message regarding
                <strong>"${data.subject}"</strong> and will respond as soon as possible.
              </p>
              <p style="color: #333; line-height: 1.6;">
                Dr. Michael Kgarimetsa and the OMASTALO team are committed to providing exceptional
                service. We typically respond within 24-48 hours during business days.
              </p>
              <div style="background-color: #f9f9f9; border-left: 4px solid #C9A227; padding: 15px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #0D1B2A; font-size: 16px;">Your Message:</h3>
                <p style="color: #666; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
              <p style="color: #333; line-height: 1.6;">
                In the meantime, feel free to explore our website for more information about our
                services, upcoming events, and educational resources.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.omastalo.co.za" style="background-color: #C9A227; color: #0D1B2A; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Visit Our Website
                </a>
              </div>
            </div>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Contact Information</strong><br>
                Email: info@omastalo.co.za<br>
                Website: www.omastalo.co.za<br>
                South Africa
              </p>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">
                © 2025 OMASTALO. All rights reserved.
              </p>
            </div>
          </div>
        `,
      };

      const adminResponse = await fetch("https://api.zeptomail.com/v1.1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ZEPTO_API_KEY,
        },
        body: JSON.stringify(adminEmailPayload),
      });

      if (!adminResponse.ok) {
        const errorData = await adminResponse.text();
        console.error("ZeptoMail admin email error:", errorData);
        throw new Error("Failed to send admin notification");
      }

      const userResponse = await fetch("https://api.zeptomail.com/v1.1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ZEPTO_API_KEY,
        },
        body: JSON.stringify(userConfirmationPayload),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.text();
        console.error("ZeptoMail user confirmation error:", errorData);
      }

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  app.get("/api/sitemap.xml", async (req, res) => {
    const baseUrl = "https://www.omastalo.co.za";
    const pages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/about", priority: "0.9", changefreq: "monthly" },
      { url: "/services", priority: "0.9", changefreq: "monthly" },
      { url: "/events", priority: "0.8", changefreq: "weekly" },
      { url: "/blog", priority: "0.8", changefreq: "weekly" },
      { url: "/resources", priority: "0.7", changefreq: "monthly" },
      { url: "/contact", priority: "0.9", changefreq: "monthly" },
      { url: "/testimonials", priority: "0.6", changefreq: "monthly" },
      { url: "/gallery", priority: "0.6", changefreq: "monthly" },
      { url: "/faq", priority: "0.7", changefreq: "monthly" },
      { url: "/terms", priority: "0.3", changefreq: "yearly" },
      { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.omastalo.co.za/api/sitemap.xml
`;
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
