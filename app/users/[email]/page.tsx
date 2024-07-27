"use client";

import { UserPosts } from "@/components/UserPosts";
import { UserProfile } from "@/components/UserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Profile({
  params: { email },
}: {
  params: { email: string };
}) {
  const decodedEmail = decodeURIComponent(email);
  const user = useQuery(api.users.getOneByEmail, { email: decodedEmail });

  return (
    <main className="mx-auto max-w-[600px]">
      <UserProfile user={user} />
      <UserPosts email={decodedEmail} />
    </main>
  );
}
