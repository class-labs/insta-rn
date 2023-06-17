import { useState } from "react";
import { Alert } from "react-native";
import {
  Anchor,
  Button,
  Input,
  Label,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";
import { useAuth } from "../support/Auth";
import { useMutation } from "@tanstack/react-query";
import { sendSignup } from "../api/sendSignup";
import { useRouter } from "expo-router";

export function SignupForm() {
  const { setAuthToken } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signup } = useMutation(
    () => sendSignup({ name, username, password }),
    {
      onSuccess: (data) => {
        setAuthToken(data.token);
        router.replace("/");
      },
      onError: (error) => {
        Alert.alert("Error", String(error));
      },
    },
  );
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
        <Label unstyled={true}>Name</Label>
        <Input
          size="$4"
          value={name}
          onChangeText={(value) => setName(value)}
          autoCorrect={false}
          returnKeyType="done"
          placeholder="Enter your name"
        />
      </YStack>
      <YStack space={4}>
        <Label unstyled={true}>Username</Label>
        <Input
          size="$4"
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
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
          onSubmitEditing={() => signup()}
          placeholder="Enter your password"
        />
      </YStack>
      <Button theme="blue" onPress={() => signup()}>
        Sign Up
      </Button>
      <XStack justifyContent="center" space={4}>
        <Paragraph>Already have an account?</Paragraph>
        <Anchor
          color="#2f6ad5"
          href="/login"
          onPress={() => router.replace("/login")}
        >
          Log in
        </Anchor>
      </XStack>
    </YStack>
  );
}
