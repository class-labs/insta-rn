import { Post } from "../types/Post";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(toUrl(`/posts/${id}`), {
    headers: getAuthHeaders(),
  });
  return await response.json();
}
