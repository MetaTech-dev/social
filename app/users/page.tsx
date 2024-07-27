"use client";

import { api } from "@/convex/_generated/api";
import { UserProfileList } from "@/components/UserProfileList";

export default function Users() {
  return (
    <main className=" max-w-[600px] mx-auto">
      <UserProfileList query={api.users.list} args={{}} />
    </main>
  );
}
