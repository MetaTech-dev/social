"use client";
import { BackButton } from "@/components/BackButton";
import { UserPosts } from "../_components/UserPosts";
import { UserProfile } from "../_components/UserProfile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Profile({
  params: { email },
}: {
  params: { email: string };
}) {
  const decodedEmail = decodeURIComponent(email);
  const user = useQuery(api.users.get, { email: decodedEmail });
  return (
    <main className="mx-auto max-w-[600px]">
      <div className="flex items-center border-x border-b">
        <BackButton />
        <h1 className="font-bold">Profile</h1>
      </div>
      <UserProfile user={user} />
      <UserPosts email={decodedEmail} />
    </main>
  );
}
