import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { generateId } from "lucia";
import { createInsertSchema } from "drizzle-zod";

export const userTable = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  username: text("username").notNull(),
  // TODO: Add email field in the future? Or maybe not?
  //email: text("email").notNull(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessionTable = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SelectUser = InferSelectModel<typeof userTable>;
export type SelectSession = InferSelectModel<typeof sessionTable>;
export type InsertUser = InferInsertModel<typeof userTable>;
// Useful for Zod validations.
export const insertUserSchema = createInsertSchema(userTable);
// Session infer insert model not needed due to Lucia handling this through the adapter already.
