import { useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "@radix-ui/react-icons";

export default function ImageUpload({
  setStorageId,
}: {
  setStorageId: (storageId: Id<"_storage">) => void;
}) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const imageInput = useRef<HTMLInputElement>(null);

  async function handleUploadImage(file: File | null) {
    if (!file) return;
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    await saveStorageId({ storageId });
    setStorageId(storageId);
    // Step 4: Clear the input
    imageInput.current!.value = "";
  }

  return (
    <>
      <Input
        type="file"
        onChange={(event) => handleUploadImage(event.target.files![0])}
        className="hidden"
        id="image-upload"
        ref={imageInput}
        accept="image/*"
      />
      <label
        htmlFor="image-upload"
        className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground"
      >
        <ImageIcon className="w-6 h-6" />
      </label>
    </>
  );
}
