import {
  mysqlTable,
  mysqlEnum,
  varchar,
  timestamp,
  text,  json,
  index,
} from "drizzle-orm/mysql-core";

export const projects = mysqlTable("projects", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  client: varchar("client", { length: 255 }),
  category: varchar("category", { length: 100 }),       // ประเภทงาน เช่น เสื้อยืด/โปโล
  images: json("images").$type<string[]>().default([]), // หลายรูป
  coverImage: varchar("cover_image", { length: 500 }),
  date: timestamp("date"),
  status: mysqlEnum("status", ["DRAFT", "PUBLISHED"]).notNull().default("DRAFT"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({ statusIdx: index("projects_status_idx").on(t.status) }));