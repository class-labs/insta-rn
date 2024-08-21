export type RootStackParamList = {
  Home: undefined;
  PostDetails: undefined;
  Login: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
