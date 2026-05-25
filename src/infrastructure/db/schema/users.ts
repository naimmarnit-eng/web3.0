import {
  mysqlTable,
  mysqlEnum,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  passwordHash: varchar("password_hash", {
    length: 255,
  }).notNull(),

  name: varchar("name", {
    length: 255,
  }),

  role: mysqlEnum("role", ["ADMIN"])
    .notNull()
    .default("ADMIN"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

