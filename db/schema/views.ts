import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const projectViews = pgTable("project_views", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  views: integer("views").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const blogViews = pgTable("blog_views", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  views: integer("views").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});