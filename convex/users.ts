import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    const user = await getUser(ctx, identity.email!);
    if (user !== null) {
      if (
        user.name !== identity.name ||
        user.email !== identity.email ||
        user.pictureUrl !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          email: identity.email,
          pictureUrl: identity.pictureUrl,
        });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      pictureUrl: identity.pictureUrl!,
      numPosts: 0,
    });
  },
});

export type User = NonNullable<Awaited<ReturnType<typeof get>>>;

export const get = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await getUser(ctx, args.email);
  },
});

export const all = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("users")
      .order("desc")
      .paginate(args.paginationOpts);

    return result;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await getUser(ctx, identity.email!);
  },
});

export async function getUser(ctx: QueryCtx, email: string) {
  return await ctx.db
    .query("users")
    .withIndex("byEmail", (q) => q.eq("email", email))
    .unique();
}

export async function list(ctx: QueryCtx) {
  return await ctx.db.query("users");
}
