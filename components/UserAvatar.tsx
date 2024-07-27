import { User } from "@/convex/users";
import { AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export function UserAvatar({ user }: { user?: User | null }) {
  return user ? (
    <Link
      href={`/users/${encodeURIComponent(user.email)}`}
      className="hover:bg-accent hover:bg-opacity-10 rounded-md p-1"
    >
      <Image
        alt="profile pic"
        src={user.pictureUrl}
        width={40}
        height={40}
        className="rounded-full"
      />
    </Link>
  ) : (
    <AvatarIcon className="w-10 h-10" />
  );
}
