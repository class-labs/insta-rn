import { Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
} from "@tamagui/lucide-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Paragraph, XStack, YStack } from "tamagui";

import { sendLikePost } from "../api/sendLikePost";
import { formatRelativeTime } from "../support/formatRelativeTime";
import { FeedPost } from "../types/FeedPost";
import { UserAvatar } from "./UserAvatar";

type Props = {
  post: FeedPost;
};

export function FeedPostItem(props: Props) {
  const { post } = props;
  const navigation = useNavigation();
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
    <Pressable
      onPress={() => navigation.navigate("PostDetails", { postId: post.id })}
    >
      <YStack>
        <XStack px={16} py={12} alignItems="center" gap={8}>
          <UserAvatar user={author} />
          <Paragraph>{author.name}</Paragraph>
        </XStack>
        <Image
          source={{ uri: post.photo }}
          aspectRatio={1}
          resizeMode="cover"
        />
        <XStack px={16} py={12} gap={12}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => likePost(post.id)}
          >
            <IconHeart color={isLikedByViewer ? "#f7444e" : undefined} />
          </Pressable>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              navigation.navigate("PostDetails", {
                postId: post.id,
                intent: "comment",
              });
            }}
          >
            <IconMessageSquare />
          </Pressable>
        </XStack>
        <YStack px={16} pb={12} gap={8}>
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
