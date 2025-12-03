import { pgTable, serial, varchar, text, timestamp, integer, boolean, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  readTime: integer("read_time").default(5).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date", { withTimezone: true }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  capacity: integer("capacity"),
  coverImage: varchar("cover_image", { length: 500 }),
  status: varchar("status", { length: 20 }).default("upcoming").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  attendees: integer("attendees").default(1).notNull(),
  message: text("message"),
  registrationRef: varchar("registration_ref", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("confirmed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  rsvpId: integer("rsvp_id").references(() => rsvps.id, { onDelete: "cascade" }),
  recipientEmail: varchar("recipient_email", { length: 255 }).notNull(),
  emailType: varchar("email_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  attempts: integer("attempts").default(0).notNull(),
  lastAttemptAt: timestamp("last_attempt_at"),
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileSize: varchar("file_size", { length: 50 }).notNull(),
  downloadCount: integer("download_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  content: text("content").notNull(),
  rating: integer("rating").default(5).notNull(),
  initials: varchar("initials", { length: 5 }).notNull(),
  status: varchar("status", { length: 20 }).default("approved").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export const insertRsvpSchema = createInsertSchema(rsvps).omit({
  id: true,
  createdAt: true,
  registrationRef: true,
});
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvps.$inferSelect;

export const insertEmailLogSchema = createInsertSchema(emailLogs).omit({
  id: true,
  createdAt: true,
});
export type InsertEmailLog = z.infer<typeof insertEmailLogSchema>;
export type EmailLog = typeof emailLogs.$inferSelect;

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  downloadCount: true,
});
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  createdAt: true,
});
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
