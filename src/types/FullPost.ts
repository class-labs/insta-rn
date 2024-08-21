import { User } from "./User";

type Comment = {
  id: string;
  author: User;
  text: string;
  createdAt: string;
};

export type FullPost = {
  id: string;
  author: User;
  photo: string;
  caption: string;
  likedBy: Array<User>;
  comments: Array<Comment>;
  isLikedByViewer: boolean;
  createdAt: string;
};
