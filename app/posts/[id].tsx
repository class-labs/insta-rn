import { Stack } from "expo-router";
import { PostDetails } from "../../src/components/PostDetails";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Post",
          headerTintColor: "black",
        }}
      />
      <PostDetails />
    </>
  );
};
