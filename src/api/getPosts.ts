import { toUrl } from "./toUrl";

type Post = {
  id: string;
  photo: string;
  caption: string;
  author: {
    id: string;
    name: string;
    profilePhoto: string;
  };
};

export async function getPosts(): Promise<Array<Post>> {
  const response = await fetch(toUrl("/posts"));
  const data = await response.json();
  return data;
}
