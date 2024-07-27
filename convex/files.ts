import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

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

export const getUrl = query(async (ctx, args) => {
  return ctx.storage.getUrl(args.storageId as Id<"_storage">);
});
