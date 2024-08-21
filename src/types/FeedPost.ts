export type FeedPost = {
  id: string;
  author: {
    id: string;
    name: string;
    profilePhoto: string;
    username: string;
  };
  photo: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  isLikedByViewer: boolean;
  createdAt: string;
};
