import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import {
  Anchor,
  Button,
  Input,
  Label,
  Paragraph,
  XStack,
  YStack,
} from "tamagui";

import { sendSignup } from "../api/sendSignup";
import { useAuth } from "../support/Auth";

export function SignupScreen() {
  const { setAuthToken } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signup } = useMutation(
    () => sendSignup({ name, username, password }),
    {
      onSuccess: (data) => {
        setAuthToken(data.token);
        // @ts-expect-error
        navigation.replace("Home");
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
      gap={20}
    >
      <YStack gap={4}>
        <Label>Name</Label>
        <Input
          size="$4"
          value={name}
          onChangeText={(value) => setName(value)}
          autoCorrect={false}
          returnKeyType="done"
          placeholder="Enter your name"
        />
      </YStack>
      <YStack gap={4}>
        <Label>Username</Label>
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
      <YStack gap={4}>
        <Label>Password</Label>
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
      <XStack justifyContent="center" gap={4}>
        <Paragraph>Already have an account?</Paragraph>
        <Anchor
          color="#2f6ad5"
          onPress={() => {
            // @ts-expect-error
            navigation.replace("Login");
          }}
        >
          Log in
        </Anchor>
      </XStack>
    </YStack>
  );
}
