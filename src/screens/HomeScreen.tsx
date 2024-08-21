import { useQuery } from "@tanstack/react-query";
import { Image, Paragraph, ScrollView, Spinner, View } from "tamagui";

import { getPosts } from "../api/getPosts";

export function HomeScreen() {
  const { isLoading, error, data } = useQuery(["getPosts"], getPosts);

  if (error) {
    return (
      <View padding={20} alignItems="center">
        <Paragraph>{String(error)}</Paragraph>
      </View>
    );
  }

  if (isLoading || !data) {
    return (
      <View padding={20} alignItems="center">
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView>
      <View gap={20}>
        {data.map((post) => {
          return (
            <View key={post.id}>
              <Image aspectRatio={1} source={{ uri: post.photo }} />
              <Paragraph paddingHorizontal={20}>{post.caption}</Paragraph>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
