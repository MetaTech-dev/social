"use client";

import { api } from "@/convex/_generated/api";
import { CHARACTER_LIMIT } from "@/convex/shared";
import { useMutation, useQuery } from "convex/react";
import { useStoreUserEffect } from "../../hooks/useStoreUserEffect";
import Image from "next/image";
import { AvatarIcon } from "@radix-ui/react-icons";
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

export function Composer() {
  const userId = useStoreUserEffect();

  const user = useQuery(api.users.getCurrentUser);

  const createPost = useMutation(api.posts.create);

  const formSchema = zod.object({
    // required zod.
    text: zod.string().min(1, "Too short").max(CHARACTER_LIMIT, "Too long"),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: zod.infer<typeof formSchema>) {
    console.log(values);
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
    <div className="border-r border-l p-4 ">
      <div className="flex gap-2 items-center pb-2">
        {user ? (
          <Link href={`/user/${encodeURIComponent(user.email)}`}>
            <Image
              alt="profile pic"
              src={user.pictureUrl}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </Link>
        ) : (
          <AvatarIcon className="w-10 h-10" />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1"
            id="text-form"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="text-md">
                    <Input placeholder="What's on your mind?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex">
        <div className="flex-1" />
        <Button type="submit" form="text-form">
          Submit
        </Button>
      </div>
    </div>
  );
}
