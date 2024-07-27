import * as async from "modern-async";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { getUser } from "./users";
import { CHARACTER_LIMIT } from "./shared";

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);

    return { ...result, page: await enrichPosts(ctx, result.page) };
  },
});

export const listByAuthorEmail = query({
  args: {
    authorEmail: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const author = await getUser(ctx, args.authorEmail);
    if (author === null) {
      return { page: [], isDone: true, continueCursor: "" };
    }
    const result = await ctx.db
      .query("posts")
      .withIndex("byAuthorId", (q) => q.eq("authorId", author._id))
      .order("desc")
      .paginate(args.paginationOpts);

    return { ...result, page: await enrichPosts(ctx, result.page) };
  },
});

export type Post = NonNullable<Awaited<ReturnType<typeof enrichPost>>>;

export const getOneById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post === null) {
      return null;
    }
    return await enrichPost(ctx, post);
  },
});

export const listByParentPostId = query({
  args: {
    parentPostId: v.id("posts"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("posts")
      .withIndex("byParentPostId", (q) =>
        q.eq("parentPostId", args.parentPostId)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    return { ...result, page: await enrichPosts(ctx, result.page) };
  },
});

async function enrichPosts(ctx: QueryCtx, posts: Doc<"posts">[]) {
  return await async.asyncMap(posts, (post) => enrichPost(ctx, post));
}

async function enrichPost(ctx: QueryCtx, post: Doc<"posts">) {
  let imageUrl;
  const author = await ctx.db.get(post.authorId);
  if (author === null) {
    throw new Error("Author not found");
  }
  if (post.imageStorageId) {
    imageUrl = await ctx.storage.getUrl(post.imageStorageId);
  }

  const likesOnPosts = await ctx.db
    .query("likesOnPosts")
    .withIndex("byPostId", (q) => q.eq("postId", post._id))
    .collect();

  return { ...post, author, imageUrl, numLikes: likesOnPosts.length };
}

export const create = mutation({
  args: {
    authorId: v.id("users"),
    text: v.string(),
    parentPostId: v.optional(v.id("posts")),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { text, authorId, ...restPost }) => {
    if (text.length <= 0 || text.length > CHARACTER_LIMIT) {
      throw new Error("Message is too damn long! (or empty)");
    }

    const numSentRecently = (
      await ctx.db
        .query("posts")
        .withIndex("byAuthorId", (q) =>
          q
            .eq("authorId", authorId)
            .gte("_creationTime", Date.now() - 1000 * 60)
        )
        .take(3)
    ).length;

    if (numSentRecently >= 3) {
      throw new Error("Too fast, slow down!");
    }

    await ctx.db.insert("posts", { authorId, text, ...restPost });
    // Instead of computing the number of tweets when a profile
    // is loaded, we "denormalize" the data and increment
    // a counter - this is safe thanks to Convex's ACID properties!
    const author = (await ctx.db.get(authorId))!;
    await ctx.db.patch(authorId, { numPosts: author.numPosts + 1 });
  },
});
