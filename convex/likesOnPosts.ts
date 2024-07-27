import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("likesOnPosts", {
      postId: args.postId,
      userId: args.userId,
    });
  },
});
