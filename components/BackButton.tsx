"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      aria-label="Go back to previous page"
      title="Go back to previous page"
      className="px-2"
    >
      <ArrowLeftIcon />
    </Button>
  );
};
