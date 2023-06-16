import { Paragraph, ScrollView } from "tamagui";
import { FeedPost } from "../types/FeedPost";

type Props = {
  posts: Array<FeedPost>;
};

export function HomeFeed(props: Props) {
  const { posts } = props;
  return (
    <ScrollView flex={1} backgroundColor="white">
      {posts.map((post) => (
        <Paragraph>{post.caption}</Paragraph>
      ))}
    </ScrollView>
  );
}
