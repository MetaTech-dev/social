"use client";

import { useConvexAuth } from "convex/react";
import { Composer } from "./Composer";

export function SignInOrComposer() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return isAuthenticated ? <Composer /> : null;
}
