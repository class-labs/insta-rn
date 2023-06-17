import { useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Pressable } from "react-native";
import { Button, Image, Spinner, TextArea, YStack, ScrollView } from "tamagui";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/uploadImage";
import { sendCreatePost } from "../api/sendCreatePost";
import { CameraView } from "./CameraView";

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
  const [isCameraOpen, setCameraOpen] = useState(false);
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

  const openCamera = async () => {
    setCameraOpen(true);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCameraOpen}
        onRequestClose={() => {
          setCameraOpen(false);
        }}
      >
        <CameraView
          onSuccess={(result) => {
            setImageSelection({ state: "uploading" });
            startUpload(result.uri);
            setCameraOpen(false);
          }}
          onCancel={() => setCameraOpen(false)}
        />
      </Modal>
      <ScrollView
        flex={1}
        backgroundColor="white"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="never"
      >
        <KeyboardAvoidingView behavior="position">
          <YStack space={12}>
            <YStack
              aspectRatio={1}
              backgroundColor="#eee"
              justifyContent="center"
              alignItems="center"
            >
              {imageSelection.state === "uploaded" ? (
                <YStack alignSelf="stretch">
                  <Pressable
                    style={({ pressed }) =>
                      pressed ? { opacity: 0.5 } : undefined
                    }
                    onPress={() => {
                      Alert.alert(
                        "Change Photo",
                        "Choose an option to open the camera or photo library.",
                        [
                          {
                            text: "Camera",
                            onPress: () => openCamera(),
                          },
                          {
                            text: "Photo Library",
                            onPress: () => openImagePicker(),
                          },
                        ],
                        { cancelable: false },
                      );
                    }}
                  >
                    <Image
                      source={{ uri: imageSelection.url }}
                      aspectRatio={1}
                    />
                  </Pressable>
                </YStack>
              ) : imageSelection.state === "uploading" ? (
                <Spinner size="large" />
              ) : (
                <YStack alignItems="center" space={8}>
                  <Button theme="blue" onPress={() => openCamera()}>
                    Camera
                  </Button>
                  <Button theme="blue" onPress={() => openImagePicker()}>
                    Photo Library
                  </Button>
                </YStack>
              )}
            </YStack>
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
    </>
  );
}
