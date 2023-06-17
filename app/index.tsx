import { Stack } from "expo-router";
import { Paragraph, YStack } from "tamagui";

import { posts } from "../src/posts";

export default () => {
  return (
    <YStack flex={1} padding={10}>
      <Stack.Screen options={{ title: "Home" }} />
      {
        // Task 1
        // Render just the caption of each post in the `posts` array
        // Hint: use array.map() to loop through the array
        // Use a <Paragraph></Paragraph> to render it
      }
    </YStack>
  );
};
