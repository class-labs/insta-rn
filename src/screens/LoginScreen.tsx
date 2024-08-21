import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Anchor, Button, Input, Label, Paragraph, View } from "tamagui";

export function LoginScreen() {
  const navigation = useNavigation();
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
      <Button theme="blue" onPress={() => {}}>
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
