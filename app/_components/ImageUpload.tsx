import { useMutation } from "convex/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "@/convex/_generated/api";
import { UploadFileResponse } from "@xixixao/uploadstuff";

export function ImageUpload() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    await saveStorageId({
      storageId: (uploaded[0].response as any).storageId,
    });
  };

  return (
    <div>ImageUpload</div>
    // <UploadDropzone
    //   uploadUrl={generateUploadUrl}
    //   fileTypes={[".pdf", "image/*"]}
    //   onUploadComplete={saveAfterUpload}
    //   onUploadError={(error: unknown) => {
    //     // Do something with the error.
    //     alert(`ERROR! ${error}`);
    //   }}
    // />
  );
}
