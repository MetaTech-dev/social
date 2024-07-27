"use client";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "@/convex/posts";
import { useRouter } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

dayjs.extend(relativeTime);

export default function PostCard({ post }: { post: Post }) {
  const encodedEmail = encodeURIComponent(post.author.email);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/posts/${post._id}`);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleCardClick();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="border-b border-x flex flex-col transition-all p-4 cursor-pointer hover:bg-accent hover:bg-opacity-10"
    >
      <div className="flex gap-2">
        <div className="flex flex-col">
          <UserAvatar user={post.author} />
          <div className="flex-grow" />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex gap-2 items-end">
            <span className="font-bold rounded-md">
              <Link href={`/users/${encodedEmail}`} className="">
                {post.author.name}
              </Link>
            </span>
            <span className="text-slate-600 text-sm">
              {dayjs(post._creationTime).fromNow()}
            </span>
          </div>
          <p
            className="break-words text-wrap"
            style={{ wordBreak: "break-all" }}
          >
            {post.text}
          </p>
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="post image"
              width={600}
              height={600}
              className="rounded-md mt-1 object-cover"
            />
          )}
        </div>
      </div>
      {/* <div className="flex gap-2 justify-evenly">
        <span className="text-muted-foreground">{post.numLikes} likes</span>
        <span className="text-muted-foreground">4 comments</span>
      </div> */}
    </article>
  );
}
