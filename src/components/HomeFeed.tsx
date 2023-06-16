import { Paragraph, ScrollView } from "tamagui";
import { FeedPost } from "../types/FeedPost";
import { RefreshControl } from "react-native";

type Props = {
  posts: Array<FeedPost>;
  isRefreshing: boolean;
  onRefresh: () => void;
};

export function HomeFeed(props: Props) {
  const { posts, isRefreshing, onRefresh } = props;
  return (
    <ScrollView
      flex={1}
      backgroundColor="white"
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {posts.map((post) => (
        <Paragraph>{post.caption}</Paragraph>
      ))}
    </ScrollView>
  );
}
