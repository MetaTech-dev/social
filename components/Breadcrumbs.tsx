"use client";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname
    .split("/")
    .filter(Boolean)
    .map((path, index, array) => ({
      title: decodeURIComponent(path),
      href: `/${array.slice(0, index + 1).join("/")}`,
    }));

  return (
    <nav aria-label="breadcrumbs" className="border-x border-b p-1">
      <ol className="flex container">
        {paths.map(({ title, href }, index) => {
          if (paths[0]) {
            title =
              paths[0].title.charAt(0).toUpperCase() + paths[0].title.slice(1);
          }
          if (paths[0].title === "posts" && index === 1) {
            title = "Post";
          }
          return (
            <li
              key={index}
              className={`${index === 0 ? "pl-0" : ""} ${
                index === paths.length - 1 ? "pr-0" : ""
              }`}
            >
              {/* If the current breadcrumb is the last item, display as text, else as a link */}
              {index === paths.length - 1 ? (
                <span className="font-bold px-1">{title}</span>
              ) : (
                <>
                  <Link
                    href={href}
                    className="text-blue-400 font-bold pr-1 hover:bg-accent hover:bg-opacity-10 rounded-md p-1 transition-all"
                  >
                    {title}
                  </Link>
                  <ChevronRightIcon className="inline-block w-4 h-4 text-gray-400 pr-1" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
