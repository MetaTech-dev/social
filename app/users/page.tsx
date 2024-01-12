"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Users() {
  const users = useQuery(api.users.all, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
  });

  return (
    <main className=" max-w-[600px] mx-auto">
      <h1 className="text-2xl font-bold">Users</h1>
      <ul>
        {users?.page.map((user) => <li key={user.email}>{user.email}</li>)}
      </ul>
    </main>
  );
}
