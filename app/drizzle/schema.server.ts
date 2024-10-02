import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { text, timestamp, pgTable, varchar, json } from "drizzle-orm/pg-core";
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

export const collection = pgTable("collection", {
  id: text("id").notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const content = pgTable("content", {
  id: text("id").notNull().primaryKey(),
  collectionId: text("collectionId")
    .notNull()
    .references(() => collection.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const revision = pgTable("revision", {
  id: text("id").notNull().primaryKey(),
  contentId: text("contentId")
    .notNull()
    .references(() => content.id),
  authorId: text("authorId")
    .notNull()
    .references(() => userTable.id),
  revisionName: varchar("revisionName", { length: 255 }).notNull(),
  losslessData: json("losslessData").default({
    data: "This CMS data is empty.",
  }),
  markdownData: text("markdownData").default("This CMS data is empty."),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const collectionRelations = relations(collection, ({ many }) => ({
  content: many(content),
}));

export const contentRelations = relations(content, ({ many, one }) => ({
  revisions: many(revision),
  collection: one(collection, {
    fields: [content.collectionId],
    references: [collection.id],
  }),
}));

export const revisionRelations = relations(revision, ({ one }) => ({
  content: one(content, {
    fields: [revision.contentId],
    references: [content.id],
  }),
  author: one(userTable, {
    fields: [revision.authorId],
    references: [userTable.id],
  }),
}));
