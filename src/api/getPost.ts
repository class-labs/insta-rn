import { FullPost } from "../types/FullPost";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function getPost(id: string) {
  const response = await fetch(toUrl(`/posts/${id}`), {
    headers: getAuthHeaders(),
  });
  const { status } = response;
  if (status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Unexpected response status ${status}`);
  }
  // @ts-expect-error
  const post: FullPost = await response.json();
  return post;
}
