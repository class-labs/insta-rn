export type RootStackParamList = {
  Home: undefined;
  Compose: undefined;
  Login: undefined;
  Signup: undefined;
  PostDetails: { postId: string; intent?: "comment" };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
