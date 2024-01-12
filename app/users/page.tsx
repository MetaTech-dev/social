"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserPorfileList } from "./_components/UserProfileList";

export default function Users() {
  return (
    <main className=" max-w-[600px] mx-auto">
      <UserPorfileList query={api.users.all} args={{}} />
    </main>
  );
}
