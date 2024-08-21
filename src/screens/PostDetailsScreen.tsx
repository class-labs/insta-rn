import { useState } from "react";
import { Alert, KeyboardAvoidingView, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  Heart as IconHeart,
  MessageSquare as IconMessageSquare,
  Send as IconSend,
} from "@tamagui/lucide-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, Input, Paragraph, ScrollView, View } from "tamagui";

import { getPost } from "../api/getPost";
import { sendCreateComment } from "../api/sendCreateComment";
import { sendLikePost } from "../api/sendLikePost";
import { UserAvatar } from "../components/UserAvatar";
import { useAuth } from "../support/Auth";
import { formatRelativeTime } from "../support/formatRelativeTime";

export function PostDetailsScreen() {
  const { isLoggedIn } = useAuth();
  const route = useRoute();
  const params = Object(route.params);
  const postId = String(params.postId);
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
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="never"
    >
      <KeyboardAvoidingView behavior="position">
        <View flexDirection="row" px={16} py={12} alignItems="center" gap={8}>
          <UserAvatar user={author} />
          <Paragraph>{author.name}</Paragraph>
        </View>
        <Image source={{ uri: photo }} aspectRatio={1} resizeMode="cover" />
        {isLoggedIn ? (
          <View flexDirection="row" px={16} py={12} gap={12}>
            <Pressable
              style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
              onPress={() => likePost(id)}
            >
              <IconHeart color={isLikedByViewer ? "#f7444e" : undefined} />
            </Pressable>
            <Pressable
              style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
              onPress={() => {
                // TODO
              }}
            >
              <IconMessageSquare />
            </Pressable>
          </View>
        ) : (
          <View flexDirection="row" h={16} />
        )}
        <View px={16} pb={12} gap={8}>
          <Paragraph fontWeight="600">
            {likeCount === 1 ? "1 like" : `${likeCount.toLocaleString()} likes`}
          </Paragraph>
          <Paragraph opacity={0.8}>{caption}</Paragraph>
        </View>
        <View height={1} backgroundColor="#e8e8e8" />
        <View px={16} pt={16} pb={12} gap={12}>
          <Paragraph fontSize={14}>Comments ({comments.length})</Paragraph>
          {comments.map((comment) => (
            <View flexDirection="row" key={comment.id} gap={10}>
              <UserAvatar user={comment.author} size="sm" />
              <View>
                <Paragraph
                  fontSize={14}
                >{`${comment.author.name}: ${comment.text}`}</Paragraph>
                <Paragraph fontSize={12} opacity={0.4}>
                  {formatRelativeTime(comment.createdAt)}
                </Paragraph>
              </View>
            </View>
          ))}
        </View>
        {isLoggedIn ? (
          <>
            <View height={1} backgroundColor="#e8e8e8" />
            <View
              flexDirection="row"
              alignItems="center"
              gap={12}
              px={16}
              pt={12}
              pb={Math.max(insets.bottom, 12)}
            >
              <Input
                size="$4"
                flex={1}
                value={newComment}
                onChangeText={(value) => setNewComment(value)}
                autoFocus={params.intent === "comment"}
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
                style={({ pressed }) =>
                  pressed ? { opacity: 0.5 } : undefined
                }
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
            </View>
          </>
        ) : null}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
