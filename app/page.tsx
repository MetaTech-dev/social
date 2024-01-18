"use client";

import { api } from "@/convex/_generated/api";
import { SignInOrComposer } from "./_components/SignInOrComposer";
import { PostScroll } from "./posts/PostScroll";

export default function Home() {
  return (
    <main className=" max-w-[600px] mx-auto">
      <SignInOrComposer />
      <PostScroll query={api.posts.list} args={{}} />
    </main>
  );
}
