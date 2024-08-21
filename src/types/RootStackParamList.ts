export type RootStackParamList = {
  Home: undefined;
  NewPost: undefined;
  PostDetails: { postId: string };
  Login: undefined;
  Signup: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
