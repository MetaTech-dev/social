"use client";

import { api } from "@/convex/_generated/api";
import { CHARACTER_LIMIT } from "@/convex/shared";
import { useMutation, useQuery } from "convex/react";
import { useStoreUserEffect } from "../../hooks/useStoreUserEffect";
import Image from "next/image";
import { AvatarIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

export function Composer() {
  const userId = useStoreUserEffect();
  const user = useQuery(api.users.getCurrentUser);
  const createPost = useMutation(api.posts.create);
  const [isUploadingImage, setisUploadingImage] = useState(false);

  const formSchema = zod.object({
    text: zod.string().min(1, "Too short").max(CHARACTER_LIMIT, "Too long"),
    imageStorageId: zod.string().optional(),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: zod.infer<typeof formSchema>) {
    try {
      await createPost({ ...values, authorId: userId! });
      form.reset();
    } catch (e) {
      form.setError("text", {
        type: "manual",
        message: "Couldn't send this post, try later",
      });
    }
  }
  return (
    <div className="border-x border-b p-4 flex flex-col gap-2 justify-center">
      <div className="flex gap-2">
        {user ? (
          <Link href={`/users/${encodeURIComponent(user.email)}`}>
            <Image
              alt="profile pic"
              src={user.pictureUrl}
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        ) : (
          <AvatarIcon className="w-10 h-10" />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="text-form"
            className=" w-full"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-md">
                    <Input placeholder="What's on your mind?" {...field} />
                  </FormControl>
                  <div className="mx-2">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        {/* media upload buttons */}
        <div className="flex gap-2">
          <div className="w-9" />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground  hover:animate-pulse"
            onClick={() => setisUploadingImage((prev) => !prev)}
          >
            <ImageIcon className="w-6 h-6" />
          </Button>
          <div className="flex-1" />
          <Button
            type="submit"
            form="text-form"
            variant="outline"
            className=" hover:animate-pulse"
          >
            Submit
          </Button>
        </div>
        {isUploadingImage && (
          <div className="flex gap-1">
            <ImageUpload />
          </div>
        )}
      </div>
    </div>
  );
}
