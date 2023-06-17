export type Post = {
  id: string;
  author: {
    id: string;
    name: string;
    profilePhoto: string;
    username: string;
  };
  photo: string;
  caption: string;
  likedBy: Array<string>;
  comments: Array<string>;
  isLikedByViewer: boolean;
  createdAt: string;
};
