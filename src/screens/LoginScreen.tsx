import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Anchor, Button, Input, Label, Paragraph, View } from "tamagui";

import { sendLogin } from "../api/sendLogin";
import { useAuth } from "../support/Auth";

export function LoginScreen() {
  const { setAuthToken } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login } = useMutation(() => sendLogin(username, password), {
    onSuccess: (data) => {
      if (data.success) {
        setAuthToken(data.token);
        // @ts-expect-error
        navigation.replace("Home");
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    },
    onError: (error) => {
      Alert.alert("Error", String(error));
    },
  });
  return (
    <View
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      px={16}
      pt={16}
      pb={24}
      gap={20}
    >
      <View gap={4}>
        <Label>Username</Label>
        <Input
          size="$4"
          value={username}
          onChangeText={(value) => setUsername(value)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          placeholder="Enter your username"
          autoFocus={true}
        />
      </View>
      <View gap={4}>
        <Label>Password</Label>
        <Input
          size="$4"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          returnKeyType="go"
          onSubmitEditing={() => login()}
          placeholder="Enter your password"
        />
      </View>
      <Button theme="blue" onPress={() => login()}>
        Login
      </Button>
      <View flexDirection="row" justifyContent="center" gap={4}>
        <Paragraph>Don't have an account?</Paragraph>
        <Anchor
          color="#2f6ad5"
          onPress={() => {
            // @ts-expect-error
            navigation.replace("Signup");
          }}
        >
          Sign up
        </Anchor>
      </View>
    </View>
  );
}
