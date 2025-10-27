import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Church website customer information submissions
 */
export const churchSubmissions = mysqlTable("church_submissions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Church Basic Information
  churchName: varchar("church_name", { length: 255 }).notNull(),
  denomination: varchar("denomination", { length: 255 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  country: varchar("country", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  website: varchar("website", { length: 500 }),
  
  // Contact Person
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactTitle: varchar("contact_title", { length: 100 }),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  contactEmail: varchar("contact_email", { length: 320 }).notNull(),
  
  // Church Details
  missionStatement: text("mission_statement"),
  visionStatement: text("vision_statement"),
  statementOfFaith: text("statement_of_faith"),
  churchHistory: text("church_history"),
  
  // Service Information
  serviceTimes: text("service_times"),
  
  // Ministries (stored as JSON array of strings)
  ministries: text("ministries"), // JSON array
  
  // Website Requirements
  hasExistingWebsite: boolean("has_existing_website").default(false),
  existingWebsiteUrl: varchar("existing_website_url", { length: 500 }),
  desiredFeatures: text("desired_features"), // JSON array
  preferredColors: varchar("preferred_colors", { length: 255 }),
  additionalNotes: text("additional_notes"),
  
  // Budget and Timeline
  budget: varchar("budget", { length: 100 }),
  timeline: varchar("timeline", { length: 100 }),
  
  // Metadata
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type ChurchSubmission = typeof churchSubmissions.$inferSelect;
export type InsertChurchSubmission = typeof churchSubmissions.$inferInsert;

