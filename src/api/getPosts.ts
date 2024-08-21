import { FeedPost } from "../types/FeedPost";
import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

export async function getPosts() {
  const response = await fetch(toUrl("/posts"), {
    headers: getAuthHeaders(),
  });
  // @ts-expect-error
  const posts: Array<FeedPost> = await response.json();
  return posts;
}
