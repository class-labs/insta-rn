import { getAuthHeaders } from "./getAuthHeaders";
import { toUrl } from "./toUrl";

type CreateCommentResult = {
  id: string;
  post: string;
  author: string;
  text: string;
  createdAt: string;
};

export async function sendCreateComment(
  postId: string,
  text: string,
): Promise<CreateCommentResult> {
  const response = await fetch(toUrl(`/posts/${postId}/comments`), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
  return await response.json();
}
