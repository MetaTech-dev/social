"use client";

import { PostScroll } from "./PostScroll";
import { api } from "@/convex/_generated/api";

export default function Posts() {
  return (
    <main className=" max-w-[600px] mx-auto">
      {/* TODO: add a search */}
      <PostScroll query={api.posts.all} args={{}} />
    </main>
  );
}
