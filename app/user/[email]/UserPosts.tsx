"use client";

import { api } from "@/convex/_generated/api";
import { PostsScrollView } from "@/components/PostsScrollView";

export function UserPosts({ email }: { email: string }) {
  return (
    <PostsScrollView
      query={api.posts.forAuthor}
      args={{ authorEmail: email }}
    />
  );
}
