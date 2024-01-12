"use client";

import { api } from "@/convex/_generated/api";
import { PostScroll } from "@/app/posts/PostScroll";

export function UserPosts({ email }: { email: string }) {
  return (
    <PostScroll query={api.posts.forAuthor} args={{ authorEmail: email }} />
  );
}
