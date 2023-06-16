import { useState } from "react";
import { Alert, KeyboardAvoidingView, Pressable } from "react-native";
import {
  Button,
  Image,
  Spinner,
  Paragraph,
  TextArea,
  YStack,
  ScrollView,
} from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/uploadImage";
import { sendCreatePost } from "../api/sendCreatePost";

type ImageSelection =
  | { state: "none" }
  | { state: "uploading" }
  | { state: "uploaded"; url: string };

export function NewPostForm() {
  const router = useRouter();
  const { mutate: startUpload } = useMutation(uploadImage, {
    onSuccess: (result) => {
      setImageSelection({ state: "uploaded", url: result.url });
    },
    onError: (error) => {
      Alert.alert(String(error));
      setImageSelection({ state: "none" });
    },
  });
  const { mutate: createPost, isLoading } = useMutation(sendCreatePost, {
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      Alert.alert(String(error));
    },
  });
  const [imageSelection, setImageSelection] = useState<ImageSelection>({
    state: "none",
  });
  const [caption, setCaption] = useState("");

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset) {
        setImageSelection({ state: "uploading" });
        startUpload(asset.uri);
      }
    }
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="white"
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="never"
    >
      <KeyboardAvoidingView behavior="position">
        <YStack space={12}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => openImagePicker()}
          >
            <YStack
              aspectRatio={1}
              backgroundColor="#eee"
              justifyContent="center"
              alignItems="center"
            >
              {imageSelection.state === "uploaded" ? (
                <YStack alignSelf="stretch">
                  <Image source={{ uri: imageSelection.url }} aspectRatio={1} />
                </YStack>
              ) : imageSelection.state === "uploading" ? (
                <Spinner size="large" />
              ) : (
                <Paragraph>Press to choose an image</Paragraph>
              )}
            </YStack>
          </Pressable>
          <YStack px={16} space={12}>
            <TextArea
              h={120}
              placeholder="Enter caption"
              value={caption}
              onChangeText={(value) => setCaption(value)}
            />
            <Button
              theme="blue"
              disabled={imageSelection.state !== "uploaded" || isLoading}
              onPress={() => {
                if (imageSelection.state === "uploaded") {
                  createPost({ photo: imageSelection.url, caption });
                }
              }}
            >
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </YStack>
        </YStack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
