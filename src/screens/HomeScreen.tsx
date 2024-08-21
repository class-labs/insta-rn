import { useQuery } from "@tanstack/react-query";
import { Paragraph, Spinner, View } from "tamagui";

import { getPosts } from "../api/getPosts";

// Task 3
// Display the image for each post. Use aspectRatio={1} to make it square.
// You should wrap your list in a ScrollView
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
    <View padding={20} gap={20}>
      {data.map((post) => {
        return <Paragraph key={post.id}>{post.caption}</Paragraph>;
      })}
    </View>
  );
}
