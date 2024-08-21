import { Post } from "../types/Post";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function sendCreatePost(payload: {
  photo: string;
  caption: string;
}) {
  const response = await fetch(toUrl("/posts"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
  // @ts-expect-error
  const result: Post = await response.json();
  return result;
}
