"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export function HeaderActions() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-end space-x-2">
      {!isAuthenticated && !isLoading ? (
        <SignInButton afterSignInUrl="/" mode="modal" />
      ) : (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:animate-pulse"
          >
            {theme === "light" ? (
              <SunIcon className="h-7 w-7" />
            ) : (
              <MoonIcon className="h-7 w-7" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {isLoading ? (
            <AvatarIcon className="w-8 h-8" />
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </>
      )}
    </div>
  );
}
