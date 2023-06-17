import { Alert, Pressable } from "react-native";
import { Avatar, Image, Paragraph, ScrollView, XStack, YStack } from "tamagui";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
} from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { getInitials } from "../support/getInitials";
import { formatRelativeTime } from "../support/formatRelativeTime";
import { sendLikePost } from "../api/sendLikePost";
import { getPost } from "../api/getPost";

export function PostDetails() {
  const pathname = usePathname();
  // TODO: Fix this
  const postId = pathname.split("/").pop() ?? "";
  const queryClient = useQueryClient();
  const { mutate: likePost } = useMutation(sendLikePost, {
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["post", postId], () => getPost(postId));
  if (error) {
    return <Paragraph>{String(error)}</Paragraph>;
  }
  if (isLoading) {
    return <Paragraph>Loading...</Paragraph>;
  }
  if (!post) {
    return <Paragraph>Not Found</Paragraph>;
  }
  const {
    id,
    author,
    photo,
    caption,
    likedBy,
    comments,
    isLikedByViewer,
    createdAt,
  } = post;
  const likeCount = likedBy.length;
  const commentCount = comments.length;
  return (
    <ScrollView flex={1} backgroundColor="white">
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
      <Image source={{ uri: photo }} aspectRatio={1} resizeMode="cover" />
      <XStack px={16} py={12} space={12}>
        <Pressable
          style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
          onPress={() => likePost(id)}
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
        <Paragraph opacity={0.8}>{caption}</Paragraph>
        <Paragraph fontWeight="600">
          {commentCount === 1
            ? "View 1 comment"
            : `View ${commentCount.toLocaleString()} comments`}
        </Paragraph>
        <Paragraph opacity={0.4}>{formatRelativeTime(createdAt)}</Paragraph>
      </YStack>
    </ScrollView>
  );
}
