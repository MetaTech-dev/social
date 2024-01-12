import { Post } from "@/convex/posts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import PostCard from "./PostCard";

dayjs.extend(relativeTime);

export function PostCards({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center border-x border-b pl-2">
        <h2 className="font-bold">Posts</h2>
      </div>
      <ul>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}
