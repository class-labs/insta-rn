import { Alert, KeyboardAvoidingView, Pressable } from "react-native";
import {
  Avatar,
  Image,
  Input,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from "tamagui";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
  Send as IconSend,
} from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { getInitials } from "../support/getInitials";
import { formatRelativeTime } from "../support/formatRelativeTime";
import { sendLikePost } from "../api/sendLikePost";
import { getPost } from "../api/getPost";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sendCreateComment } from "../api/sendCreateComment";

export function PostDetails() {
  const pathname = usePathname();
  // TODO: Fix this
  const postId = pathname.split("/").pop() ?? "";
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const [newComment, setNewComment] = useState("");
  const { mutate: likePost } = useMutation(sendLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  const { mutate: createComment, isLoading: isSavingComment } = useMutation(
    (comment: string) => sendCreateComment(postId, comment),
    {
      onSuccess: () => {
        setNewComment("");
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        Alert.alert(String(error));
      },
    },
  );
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
  const { id, author, photo, caption, likedBy, comments, isLikedByViewer } =
    post;
  const likeCount = likedBy.length;
  return (
    <ScrollView
      flex={1}
      backgroundColor="white"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="never"
    >
      <KeyboardAvoidingView behavior="position">
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
        </YStack>
        <View height={1} backgroundColor="#e8e8e8" />
        <YStack px={16} pt={16} pb={12} space={12}>
          <Paragraph fontSize={14}>Comments ({comments.length})</Paragraph>
          {comments.map((comment) => {
            const { author } = comment;
            return (
              <XStack key={comment.id} space={10}>
                <Avatar circular size="$3">
                  <Avatar.Image source={{ uri: author.profilePhoto }} />
                  <Avatar.Fallback>
                    <YStack flex={1} jc="center" ai="center">
                      <Paragraph>{getInitials(author.name)}</Paragraph>
                    </YStack>
                  </Avatar.Fallback>
                </Avatar>
                <YStack>
                  <Paragraph
                    fontSize={14}
                  >{`${author.name}: ${comment.text}`}</Paragraph>
                  <Paragraph fontSize={12} opacity={0.4}>
                    {formatRelativeTime(comment.createdAt)}
                  </Paragraph>
                </YStack>
              </XStack>
            );
          })}
        </YStack>
        <View height={1} backgroundColor="#e8e8e8" />
        <XStack
          alignItems="center"
          space={12}
          px={16}
          pt={12}
          pb={Math.max(insets.bottom, 12)}
        >
          <Input
            size="$4"
            flex={1}
            value={newComment}
            onChangeText={(value) => setNewComment(value)}
            disabled={isSavingComment}
            returnKeyType="go"
            onSubmitEditing={() => {
              if (!isSavingComment) {
                createComment(newComment);
              }
            }}
            placeholder="Comment"
          />
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              if (!isSavingComment) {
                createComment(newComment);
              }
            }}
          >
            <View mt={2}>
              <IconSend />
            </View>
          </Pressable>
        </XStack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
