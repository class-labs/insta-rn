import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Anchor, Button, Input, Label, Paragraph, View } from "tamagui";

import { useAuth } from "../support/Auth";

async function sendLogin(username: string, password: string) {
  const response = await fetch("https://insta-api.web-api.dev/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = Object(await response.json());
  if (response.status === 200) {
    return String(data.token);
  } else {
    return null;
  }
}

export function LoginScreen() {
  const navigation = useNavigation();
  const { setAuthToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          returnKeyType="done"
          placeholder="Enter your password"
        />
      </View>
      <Button
        theme="blue"
        onPress={async () => {
          const authToken = await sendLogin(username, password);
          if (authToken === null) {
            Alert.alert("Login failed");
          } else {
            setAuthToken(authToken);
            navigation.navigate("Home");
          }
        }}
      >
        Login
      </Button>
      <View flexDirection="row" justifyContent="center" gap={4}>
        <Paragraph>Don't have an account?</Paragraph>
        <Anchor
          color="#2f6ad5"
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          Sign up
        </Anchor>
      </View>
    </View>
  );
}
