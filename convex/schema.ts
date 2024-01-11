import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    pictureUrl: v.string(),
    numPosts: v.number(),
  }).index("byEmail", ["email"]),
  posts: defineTable({
    authorId: v.id("users"),
    text: v.string(),
  }).index("byAuthorId", ["authorId"]),
});
