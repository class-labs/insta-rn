import { Stack } from "expo-router";
import { HomeFeed } from "../src/components/HomeFeed";

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <HomeFeed />
    </>
  );
};
