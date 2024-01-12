import { Post } from "@/convex/posts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

export function Posts(props: { posts: Post[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center border-x border-b pl-2">
        <h2 className="text-lg font-bold">Posts</h2>
      </div>
      <ul>
        {props.posts.map((post) => {
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
                      <span className="font-bold">{post.author.name}</span>
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
        })}
      </ul>
    </div>
  );
}
