import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  blogPosts,
  events,
  rsvps,
  resources,
  testimonials,
  gallery,
  emailLogs,
  type User,
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Event,
  type InsertEvent,
  type Rsvp,
  type InsertRsvp,
  type Resource,
  type InsertResource,
  type Testimonial,
  type InsertTestimonial,
  type Gallery,
  type InsertGallery,
  type EmailLog,
  type InsertEmailLog,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllBlogPosts(status?: string): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  getAllEvents(status?: string): Promise<Event[]>;
  getEventBySlug(slug: string): Promise<Event | undefined>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  getRsvpsByEvent(eventId: number): Promise<Rsvp[]>;
  createRsvp(rsvp: InsertRsvp & { registrationRef: string }): Promise<Rsvp>;
  
  createEmailLog(log: InsertEmailLog): Promise<EmailLog>;
  updateEmailLog(id: number, data: Partial<InsertEmailLog>): Promise<EmailLog | undefined>;
  getEmailLogsByRsvp(rsvpId: number): Promise<EmailLog[]>;
  getPendingEmailLogs(): Promise<EmailLog[]>;
  
  getAllResources(category?: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: number): Promise<boolean>;
  incrementDownloadCount(id: number): Promise<boolean>;
  
  getAllTestimonials(status?: string): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  getAllGallery(category?: string): Promise<Gallery[]>;
  createGalleryItem(item: InsertGallery): Promise<Gallery>;
  deleteGalleryItem(id: number): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllBlogPosts(status?: string): Promise<BlogPost[]> {
    if (status) {
      return await db.select().from(blogPosts).where(eq(blogPosts.status, status));
    }
    return await db.select().from(blogPosts);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return post;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db.insert(blogPosts).values(post).returning();
    return created;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db.update(blogPosts).set({ ...post, updatedAt: new Date() }).where(eq(blogPosts.id, id)).returning();
    return updated;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllEvents(status?: string): Promise<Event[]> {
    if (status) {
      return await db.select().from(events).where(eq(events.status, status));
    }
    return await db.select().from(events);
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
    return event;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const [updated] = await db.update(events).set({ ...event, updatedAt: new Date() }).where(eq(events.id, id)).returning();
    return updated;
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getRsvpsByEvent(eventId: number): Promise<Rsvp[]> {
    return await db.select().from(rsvps).where(eq(rsvps.eventId, eventId));
  }

  async createRsvp(rsvp: InsertRsvp & { registrationRef: string }): Promise<Rsvp> {
    const [created] = await db.insert(rsvps).values(rsvp).returning();
    return created;
  }

  async createEmailLog(log: InsertEmailLog): Promise<EmailLog> {
    const [created] = await db.insert(emailLogs).values(log).returning();
    return created;
  }

  async updateEmailLog(id: number, data: Partial<InsertEmailLog>): Promise<EmailLog | undefined> {
    const [updated] = await db.update(emailLogs).set(data).where(eq(emailLogs.id, id)).returning();
    return updated;
  }

  async getEmailLogsByRsvp(rsvpId: number): Promise<EmailLog[]> {
    return await db.select().from(emailLogs).where(eq(emailLogs.rsvpId, rsvpId));
  }

  async getPendingEmailLogs(): Promise<EmailLog[]> {
    return await db.select().from(emailLogs).where(eq(emailLogs.status, "pending"));
  }

  async getAllResources(category?: string): Promise<Resource[]> {
    if (category) {
      return await db.select().from(resources).where(eq(resources.category, category));
    }
    return await db.select().from(resources);
  }

  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
    return resource;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [created] = await db.insert(resources).values(resource).returning();
    return created;
  }

  async updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource | undefined> {
    const [updated] = await db.update(resources).set({ ...resource, updatedAt: new Date() }).where(eq(resources.id, id)).returning();
    return updated;
  }

  async deleteResource(id: number): Promise<boolean> {
    const result = await db.delete(resources).where(eq(resources.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async incrementDownloadCount(id: number): Promise<boolean> {
    const resource = await this.getResource(id);
    if (!resource) return false;
    await db.update(resources).set({ downloadCount: resource.downloadCount + 1 }).where(eq(resources.id, id));
    return true;
  }

  async getAllTestimonials(status?: string): Promise<Testimonial[]> {
    if (status) {
      return await db.select().from(testimonials).where(eq(testimonials.status, status));
    }
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(testimonial).returning();
    return created;
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getAllGallery(category?: string): Promise<Gallery[]> {
    if (category) {
      return await db.select().from(gallery).where(eq(gallery.category, category));
    }
    return await db.select().from(gallery);
  }

  async createGalleryItem(item: InsertGallery): Promise<Gallery> {
    const [created] = await db.insert(gallery).values(item).returning();
    return created;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const result = await db.delete(gallery).where(eq(gallery.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DbStorage();
