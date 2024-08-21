export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
