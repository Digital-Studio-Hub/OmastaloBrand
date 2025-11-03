import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
