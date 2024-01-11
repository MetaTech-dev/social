"use client";

import { api } from "@/convex/_generated/api";
import { PostsScrollView } from "../../components/PostsScrollView";

export function AllPosts() {
  return <PostsScrollView query={api.posts.all} args={{}} />;
}
