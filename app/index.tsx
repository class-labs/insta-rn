import { Stack } from "expo-router";
import { Image, Paragraph, ScrollView, XStack, YStack } from "tamagui";
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
    <ScrollView flex={1} backgroundColor="white">
      <Stack.Screen options={{ title: "Home" }} />
      {result.data?.map((post) => (
        <YStack key={post.id}>
          <XStack padding={8} alignItems="center" space={10}>
            <Image
              width={40}
              height={40}
              borderRadius={20}
              source={{ uri: post.author.profilePhoto }}
            />
            <Paragraph>{post.author.name}</Paragraph>
          </XStack>
          <Image source={{ uri: post.photo }} aspectRatio={1} />
          <Paragraph padding={10}>{post.caption}</Paragraph>
        </YStack>
      ))}
    </ScrollView>
  );
};
