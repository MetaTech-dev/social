"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      aria-label="Go back to previous page"
      title="Go back to previous page"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </Button>
  );
};
