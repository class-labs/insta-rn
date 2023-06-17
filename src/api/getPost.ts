import { FullPost } from "../types/FullPost";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function getPost(id: string): Promise<FullPost> {
  const response = await fetch(toUrl(`/posts/${id}`), {
    headers: getAuthHeaders(),
  });
  return await response.json();
}
