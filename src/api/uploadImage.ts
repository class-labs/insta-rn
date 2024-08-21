import { toUrl } from "./toUrl";

type UploadResponse = {
  id: string;
  fileName: string;
  url: string;
};

const supportedTypes: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
};

async function uriToBlob(imageUri: string) {
  const response = await fetch(imageUri);
  return await response.blob();
}

export async function uploadImage(imageUri: string) {
  const fileExt = imageUri.split(".").pop() ?? "";
  const mimeType = supportedTypes[fileExt] ?? "application/octet-stream";
  const blob = await uriToBlob(imageUri);
  const response = await fetch(toUrl("/images"), {
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",
      "content-disposition": mimeType,
    },
    body: blob,
  });
  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
  // @ts-expect-error
  const result: UploadResponse = await response.json();
  return result;
}
