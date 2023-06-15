import { Pressable } from "react-native";
import { Avatar, Image, Paragraph, XStack, YStack } from "tamagui";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
} from "@tamagui/lucide-icons";
import { getInitials } from "../support/getInitials";
import { FeedPost } from "../types/FeedPost";

type Props = {
  post: FeedPost;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  const { author, caption, likeCount, commentCount, isLikedByViewer } = post;
  return (
    <YStack>
      <XStack px={16} py={12} alignItems="center" space={8}>
        <Avatar circular size="$4">
          <Avatar.Image source={{ uri: author.profilePhoto }} />
          <Avatar.Fallback>
            <Paragraph>{getInitials(author.name)}</Paragraph>
          </Avatar.Fallback>
        </Avatar>
        <Paragraph>{author.name}</Paragraph>
      </XStack>
      <Image source={{ uri: post.photo }} aspectRatio={1} resizeMode="cover" />
      <XStack px={16} py={12} space={12}>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => {}}
        >
          <IconHeart color={isLikedByViewer ? "#f7444e" : "black"} />
        </Pressable>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => {
            // TODO
          }}
        >
          <IconMessageSquare />
        </Pressable>
      </XStack>
      <YStack px={16} pb={12} space={8}>
        <Paragraph fontWeight="600">
          {likeCount === 1 ? "1 like" : `${likeCount.toLocaleString()} likes`}
        </Paragraph>
        <Paragraph opacity={0.85}>{caption}</Paragraph>
        <Paragraph fontWeight="600">
          {commentCount === 1
            ? "View 1 comment"
            : `View ${commentCount.toLocaleString()} comments`}
        </Paragraph>
      </YStack>
    </YStack>
  );
}
