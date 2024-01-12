import Link from "next/link";
import { HeartIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HeaderActions } from "./HeaderActions";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const items = [
    {
      title: "Home",
      href: "/",
      disabled: false,
    },
  ];
  return (
    <header className="border-x border-b">
      <div className="px-4 flex h-12 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/"
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
              className: "hover:animate-pulse !px-1 !py-1",
            })}
          >
            <Image
              src="/images/apple-touch-icon.png"
              alt="logo"
              width={24}
              height={24}
              className="mr-1"
            />
            <span className="text-xl">social</span>
          </Link>
          {/* {items?.length ? (
            <nav className="flex gap-6">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null} */}
        </div>
        <div className="flex-1" />
        <HeaderActions />
      </div>
    </header>
  );
}
