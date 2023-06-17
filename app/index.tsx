import { Stack } from "expo-router";
import { Paragraph, YStack } from "tamagui";

import { posts } from "../src/posts";

export default () => {
  return (
    <YStack flex={1} padding={10}>
      <Stack.Screen options={{ title: "Home" }} />
      {posts.map((post) => (
        <Paragraph key={post.id}>{post.caption}</Paragraph>
      ))}
    </YStack>
  );
};
