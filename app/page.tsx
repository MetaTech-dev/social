import { AllPosts } from "./_components/AllPosts";
import { SignInOrComposer } from "./_components/SignInOrComposer";

export default function Home() {
  return (
    <main className=" max-w-[600px] mx-auto">
      <SignInOrComposer />
      <AllPosts />
    </main>
  );
}
