import { BackButton } from "@/components/BackButton";
import { UserPosts } from "./UserPosts";
import { UserProfile } from "./UserProfile";

export default function Profile({
  params: { email },
}: {
  params: { email: string };
}) {
  const decodedEmail = decodeURIComponent(email);

  return (
    <main className="mx-auto max-w-[600px]">
      <div className="flex items-center border-x border-b">
        <BackButton />
        <h1 className="text-lg font-bold">Profile</h1>
      </div>
      <UserProfile email={decodedEmail} />
      <UserPosts email={decodedEmail} />
    </main>
  );
}
