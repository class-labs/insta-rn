import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { useAnimatedKeyboard } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Anchor,
  Button,
  Input,
  Label,
  Paragraph,
  ScrollView,
  View,
} from "tamagui";

export function SignupScreen() {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ScrollView
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        flex={1}
        justifyContent="flex-start"
        alignItems="stretch"
        paddingHorizontal={16}
        paddingTop={16}
        paddingBottom={safeAreaInsets.bottom}
        gap={20}
      >
        <Paragraph fontSize={16}>
          Join our vibrant community and express yourself like never before! By
          signing up, you’ll unlock the power to share your stories, photos, and
          moments with friends and followers.
        </Paragraph>
        <View gap={4}>
          <Label>Name</Label>
          <Input
            value={name}
            onChangeText={(value) => setName(value)}
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your name"
            autoFocus={true}
          />
        </View>
        <View gap={4}>
          <Label>Username</Label>
          <Input
            value={username}
            onChangeText={(value) => setUsername(value)}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            placeholder="Enter your username"
          />
        </View>
        <View gap={4}>
          <Label>Password</Label>
          <Input
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
            returnKeyType="done"
            placeholder="Enter your password"
          />
        </View>
        <View flex={1} />
        <Button
          theme="blue"
          onPress={() => {
            Alert.alert("Thank you for signing up!");
          }}
        >
          Sign Up
        </Button>
        <View flexDirection="row" justifyContent="center" gap={4}>
          <Paragraph>Already have an account?</Paragraph>
          <Anchor
            color="#2f6ad5"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Log in
          </Anchor>
        </View>
        <Animated.View style={{ height: keyboard.height }} />
      </View>
    </ScrollView>
  );
}
