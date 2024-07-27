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
    parentPostId: v.optional(v.id("posts")),
    imageStorageId: v.optional(v.id("_storage")),
    numLikes: v.optional(v.number()),
  })
    .index("byAuthorId", ["authorId"])
    .index("byParentPostId", ["parentPostId"]),

  files: defineTable({
    storageId: v.id("_storage"),
  }).index("byStorageId", ["storageId"]),

  likesOnPosts: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
  })
    .index("byPostId", ["postId"])
    .index("byUserId", ["userId"]),
});
