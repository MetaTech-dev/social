import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveStorageId = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) =>
    ctx.db.insert("files", {
      storageId: args.storageId,
    }),
});

export const generateUploadUrl = mutation(async (ctx) =>
  ctx.storage.generateUploadUrl()
);
