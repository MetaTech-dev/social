"use client";

import { api } from "@/convex/_generated/api";
import { CHARACTER_LIMIT } from "@/convex/shared";
import { useMutation, useQuery } from "convex/react";
import { useStoreUserEffect } from "../hooks/useStoreUserEffect";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { UserAvatar } from "./UserAvatar";
import ImageUpload from "./ImageUpload";

export function Composer() {
  const userId = useStoreUserEffect();
  const user = useQuery(api.users.getCurrentUser);
  const createPost = useMutation(api.posts.create);

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
      await createPost({
        ...values,
        authorId: userId as Id<"users">,
        imageStorageId: values.imageStorageId as Id<"_storage">,
      });
      form.reset();
    } catch (e) {
      form.setError("text", {
        type: "manual",
        message: "Couldn't send this post, try later",
      });
    }
  }

  const imageUrl = useQuery(
    api.files.getUrl,
    form.watch("imageStorageId")
      ? {
          storageId: form.watch("imageStorageId") as Id<"_storage">,
        }
      : "skip"
  );

  return (
    <div className="border-x border-b p-4 flex flex-col gap-2 justify-center">
      <div className="flex gap-2">
        <UserAvatar user={user} />
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
      {form.watch("imageStorageId") && imageUrl && (
        <div className="flex justify-center">
          <Image
            alt="uploaded image"
            src={imageUrl}
            width={400}
            height={400}
            className="rounded-md"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-10" />
          <ImageUpload
            setStorageId={(imageStorageId: Id<"_storage">) =>
              form.setValue("imageStorageId", imageStorageId)
            }
          />
          <div className="flex-1" />
          <Button type="submit" form="text-form" variant="outline">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
