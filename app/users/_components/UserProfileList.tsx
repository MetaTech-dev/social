"use client";

import {
  PaginatedQueryArgs,
  PaginatedQueryReference,
  usePaginatedQuery,
} from "convex/react";
import { useEffect } from "react";
import { UserProfile } from "./UserProfile";

export function UserPorfileList<Query extends PaginatedQueryReference>({
  query,
  args,
}: {
  query: Query;
  args: PaginatedQueryArgs<Query>;
}) {
  const {
    results: users,
    status,
    loadMore,
  } = usePaginatedQuery(query, args, { initialNumItems: 5 });

  useEffect(() => {
    const handleScroll = () => {
      const page = document.documentElement;
      const closeToBottom =
        page.scrollHeight - page.scrollTop - page.clientHeight < 100;
      if (closeToBottom && status === "CanLoadMore") {
        loadMore(5);
      }
    };
    handleScroll();
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [status, loadMore]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-x border-b pl-2">
        <h2 className="text-lg font-bold">Users</h2>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <UserProfile user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
