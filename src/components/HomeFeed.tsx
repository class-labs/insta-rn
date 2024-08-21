import { RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Paragraph, ScrollView } from "tamagui";

import { getPosts } from "../api/getPosts";
import { FeedPostItem } from "./FeedPostItem";

export function HomeFeed() {
  const { data, error, isLoading, refetch } = useQuery(["posts"], getPosts);
  if (error) {
    return <Paragraph>{String(error)}</Paragraph>;
  }
  if (!data) {
    return <Paragraph>Loading...</Paragraph>;
  }
  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {data.map((post) => (
        <FeedPostItem key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}
