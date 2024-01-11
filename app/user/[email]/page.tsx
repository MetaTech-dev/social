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
      <BackButton />
      <UserProfile email={decodedEmail} />
      <UserPosts email={decodedEmail} />
    </main>
  );
}
