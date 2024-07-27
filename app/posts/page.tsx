"use client";

import { SignInOrComposer } from "@/components/SignInOrComposer";
import { PostScroll } from "@/components/PostScroll";
import { api } from "@/convex/_generated/api";

export default function Posts() {
  return (
    <main className=" max-w-[600px] mx-auto">
      <SignInOrComposer />
      <PostScroll query={api.posts.list} args={{}} />
    </main>
  );
}
