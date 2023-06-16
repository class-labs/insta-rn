import { useState } from "react";
import { Alert } from "react-native";
import { Button, Input, Label, YStack } from "tamagui";
import { useAuth } from "../support/Auth";
import { useMutation } from "@tanstack/react-query";
import { sendLogin } from "../api/sendLogin";
import { useRouter } from "expo-router";

export function LoginForm() {
  const { setAuthToken } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation(() => sendLogin(username, password), {
    onSuccess: (data) => {
      if (data.success) {
        setAuthToken(data.token);
        router.replace("/");
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      px={16}
      pt={16}
      pb={24}
      space={20}
      backgroundColor="white"
    >
      <YStack space={4}>
        <Label unstyled={true}>Username</Label>
        <Input
          size="$4"
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          onSubmitEditing={() => {
            // TODO: Focus the password field
          }}
          placeholder="Enter your username"
        />
      </YStack>
      <YStack space={4}>
        <Label unstyled={true}>Password</Label>
        <Input
          size="$4"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          returnKeyType="go"
          onSubmitEditing={() => login()}
          placeholder="Enter your password"
        />
      </YStack>
      <Button theme="blue" onPress={() => login()}>
        Login
      </Button>
    </YStack>
  );
}
