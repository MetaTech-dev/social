import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "@/convex/posts";

dayjs.extend(relativeTime);

export default function PostCard({ post }: { post: Post }) {
  const encodedEmail = encodeURIComponent(post.author.email);

  return (
    <Link key={post._id} href={`/posts/${post._id}`}>
      <li className="p-4 border-b border-x flex gap-2 items-center transition-all hover:bg-accent hover:animate-pulse">
        <Link href={`/users/${encodedEmail}`}>
          <Image
            alt="profile pic"
            src={post.author.pictureUrl}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        </Link>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link href={`/users/${encodedEmail}`}>
              <span className="text-sm font-bold">{post.author.name}</span>
            </Link>
            <span className="text-slate-600 text-sm">
              {dayjs(post._creationTime).fromNow()}
            </span>
          </div>
          <div>{post.text}</div>
        </div>
      </li>
    </Link>
  );
}
