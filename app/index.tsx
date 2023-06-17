import { Stack } from "expo-router";
import { Image, Paragraph, YStack } from "tamagui";

import { posts } from "../src/posts";

export default () => {
  return (
    <YStack flex={1}>
      <Stack.Screen options={{ title: "Home" }} />
      {posts.map((post) => (
        <YStack key={post.id}>
          <Image source={{ uri: post.photo }} aspectRatio={1} />
          <Paragraph padding={10}>{post.caption}</Paragraph>
        </YStack>
      ))}
    </YStack>
  );
};
