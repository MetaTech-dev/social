"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function UserProfile({ email }: { email: string }) {
  const user = useQuery(api.users.get, { email });
  console.log(user);
  return user == null ? null : (
    <div className="border-x border-b p-6 flex">
      <Image
        src={user.pictureUrl}
        alt="profile pic"
        width={80}
        height={80}
        className="w-20 h-20 rounded-full"
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
  );
}
