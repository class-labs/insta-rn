import { Stack } from "expo-router";
import { NewPostForm } from "../src/components/NewPostForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "New Post",
          headerTintColor: "black",
        }}
      />
      <NewPostForm />
    </>
  );
};
