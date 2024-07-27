import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { User } from "@/convex/users";

dayjs.extend(relativeTime);

export function UserProfile({ user }: { user: User | null | undefined }) {
  return !user ? null : (
    <Link href={`/users/${encodeURIComponent(user.email)}`}>
      <div className="border-x border-b p-6 flex">
        <Image
          src={user.pictureUrl}
          alt="profile pic"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex flex-col justify-center pl-2">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <div className="flex gap-1">
            <h2 className="text-slate-500">{user.email}</h2>·
            <h3>
              {user.numPosts} Post{user.numPosts === 1 ? "" : "s"}
            </h3>
          </div>
          <div className="text-slate-600 text-sm">
            Joined {dayjs(user._creationTime).fromNow()}
          </div>
        </div>
      </div>
    </Link>
  );
}
