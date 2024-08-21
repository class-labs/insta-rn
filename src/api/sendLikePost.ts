import { Post } from "../types/Post";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function sendLikePost(postId: string) {
  const response = await fetch(toUrl(`/posts/${postId}/like`), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
  // @ts-expect-error
  const post: Post = await response.json();
  return post;
}
