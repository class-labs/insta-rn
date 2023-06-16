import { FeedPost } from "../types/FeedPost";
import { toUrl } from "./toUrl";

export async function getPosts() {
  const response = await fetch(toUrl("/posts"));
  const posts: Array<FeedPost> = await response.json();
  return posts;
}
