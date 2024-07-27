"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { ToggleThemeButton } from "./ToggleThemeButton";

export function HeaderActions() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className="flex items-center justify-end space-x-2">
      {isAuthenticated ? (
        <>
          <ToggleThemeButton />
          {isLoading ? (
            <AvatarIcon className="w-8 h-8" />
          ) : (
            <div className="pr-1 hover:bg-accent hover:bg-opacity-10 rounded-md p-1">
              <UserButton />
            </div>
          )}
        </>
      ) : (
        <div className="pr-1 hover:bg-accent hover:bg-opacity-10 rounded-md p-1">
          <SignInButton mode="modal" />
        </div>
      )}
    </div>
  );
}
