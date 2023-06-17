import { Stack } from "expo-router";
import { Image, Paragraph, ScrollView, YStack } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../src/api/getPosts";

export default () => {
  const result = useQuery(["posts"], getPosts);

  if (result.error) {
    return <Paragraph>{String(result.error)}</Paragraph>;
  }

  if (result.isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return (
    <ScrollView flex={1}>
      <Stack.Screen options={{ title: "Home" }} />
      {result.data?.map((post) => (
        <YStack key={post.id}>
          <Image source={{ uri: post.photo }} aspectRatio={1} />
          <Paragraph padding={10}>{post.caption}</Paragraph>
        </YStack>
      ))}
    </ScrollView>
  );
};
