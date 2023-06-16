import { Post } from "../types/Post";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function sendCreatePost(payload: {
  photo: string;
  caption: string;
}): Promise<Post> {
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
  return await response.json();
}
