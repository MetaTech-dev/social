import { BackButton } from "@/components/BackButton";
import { Posts } from "@/components/Posts";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

export const dynamic = "force-dynamic";

export default async function Post({ params }: { params: { id: string } }) {
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const post = await client.query(api.posts.get, {
    id: params.id as Id<"posts">,
  });

  return (
    <main className="mx-auto w-[600px]">
      <div className="flex items-center border-x">
        <BackButton />
        <h1 className="text-l font-bold">Post</h1>
      </div>
      <Posts posts={post == null ? [] : [post]} />
    </main>
  );
}
