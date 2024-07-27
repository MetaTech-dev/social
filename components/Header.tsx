import Link from "next/link";
import { HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HeaderActions } from "./HeaderActions";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Nav } from "./Nav";

export function Header() {
  const items = [
    {
      title: "Home",
      href: "/",
      disabled: false,
    },
  ];
  return (
    <header className="border">
      <div className="px-4 flex h-12 items-center space-x-4 sm:justify-between sm:space-x-0 container">
        <Nav />
        <div className="flex-1" />
        <HeaderActions />
      </div>
    </header>
  );
}
