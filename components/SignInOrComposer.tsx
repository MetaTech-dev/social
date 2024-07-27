"use client";

import { useConvexAuth } from "convex/react";
import { Composer } from "@/components/Composer";

export function SignInOrComposer() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return isAuthenticated ? <Composer /> : null;
}
