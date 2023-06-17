import { Alert, Pressable } from "react-native";
import { Avatar, Image, Paragraph, XStack, YStack } from "tamagui";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
} from "@tamagui/lucide-icons";
import { getInitials } from "../support/getInitials";
import { FeedPost } from "../types/FeedPost";
import { formatRelativeTime } from "../support/formatRelativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendLikePost } from "../api/sendLikePost";
import { useRouter } from "expo-router";

type Props = {
  post: FeedPost;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: likePost } = useMutation(sendLikePost, {
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  const {
    author,
    caption,
    likeCount,
    commentCount,
    isLikedByViewer,
    createdAt,
  } = post;
  return (
    <Pressable onPress={() => router.push(`/posts/${post.id}`)}>
      <YStack>
        <XStack px={16} py={12} alignItems="center" space={8}>
          <Avatar circular size="$4">
            <Avatar.Image source={{ uri: author.profilePhoto }} />
            <Avatar.Fallback>
              <YStack flex={1} jc="center" ai="center">
                <Paragraph>{getInitials(author.name)}</Paragraph>
              </YStack>
            </Avatar.Fallback>
          </Avatar>
          <Paragraph>{author.name}</Paragraph>
        </XStack>
        <Image
          source={{ uri: post.photo }}
          aspectRatio={1}
          resizeMode="cover"
        />
        <XStack px={16} py={12} space={12}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => likePost(post.id)}
          >
            <IconHeart color={isLikedByViewer ? "#f7444e" : "black"} />
          </Pressable>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              router.push({
                pathname: `/posts/${post.id}`,
                params: { intent: "comment" },
              });
            }}
          >
            <IconMessageSquare />
          </Pressable>
        </XStack>
        <YStack px={16} pb={12} space={8}>
          <Paragraph fontWeight="600">
            {likeCount === 1 ? "1 like" : `${likeCount.toLocaleString()} likes`}
          </Paragraph>
          <Paragraph opacity={0.8}>{caption}</Paragraph>
          <Paragraph fontWeight="600">
            {commentCount === 1
              ? "View 1 comment"
              : `View ${commentCount.toLocaleString()} comments`}
          </Paragraph>
          <Paragraph opacity={0.4}>{formatRelativeTime(createdAt)}</Paragraph>
        </YStack>
      </YStack>
    </Pressable>
  );
}
