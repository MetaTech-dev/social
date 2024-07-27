"use client";

import { api } from "@/convex/_generated/api";
import { PostScroll } from "@/components/PostScroll";

export function UserPosts({ email }: { email: string }) {
  return (
    <PostScroll
      query={api.posts.listByAuthorEmail}
      args={{ authorEmail: email }}
    />
  );
}
