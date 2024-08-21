import { useRef, useState } from "react";
import { Alert, Pressable } from "react-native";
import {
  ChevronLeft as IconChevronLeft,
  RefreshCw as IconRefreshCw,
} from "@tamagui/lucide-icons";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera/legacy";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Paragraph, Theme, View } from "tamagui";

type Props = {
  onSuccess: (result: CameraCapturedPicture) => void;
  onCancel: () => void;
};

export function CameraView(props: Props) {
  const { onSuccess, onCancel } = props;
  const insets = useSafeAreaInsets();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    return null;
  }
  if (!permission.granted) {
    return (
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$background"
        gap={12}
      >
        <Paragraph>Camera permission needed.</Paragraph>
        <Button onPress={() => requestPermission()}>Enable Camera</Button>
        <Button onPress={() => onCancel()}>Cancel</Button>
      </View>
    );
  }
  return (
    <Theme name="dark">
      <View
        flex={1}
        backgroundColor="black"
        gap={12}
        pt={insets.top}
        pb={insets.bottom}
      >
        <View flexDirection="row" p={12}>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => onCancel()}
          >
            <IconChevronLeft size={32} />
          </Pressable>
          <Paragraph flex={1} textAlign="center">
            Take Photo
          </Paragraph>
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => setType(CameraType.front)}
          >
            <IconRefreshCw />
          </Pressable>
        </View>
        <Camera
          ref={cameraRef}
          type={type}
          style={{ width: "100%", aspectRatio: 1 }}
          onMountError={(error) => {
            Alert.alert("Error", error.message, [
              {
                text: "OK",
                onPress: () => {
                  // onCancel()
                },
              },
            ]);
          }}
        />
        <View flex={1} justifyContent="center" alignItems="center">
          <Pressable
            onPress={async () => {
              const result = await cameraRef.current?.takePictureAsync();
              if (result) {
                onSuccess(result);
              }
            }}
          >
            <View
              width={72}
              height={72}
              borderRadius={36}
              backgroundColor="$background"
              borderWidth={6}
              borderColor="#e8e8e8"
            />
          </Pressable>
        </View>
      </View>
    </Theme>
  );
}
