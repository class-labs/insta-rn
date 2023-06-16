import { Stack } from "expo-router";
import { Paragraph } from "tamagui";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Login",
          headerTintColor: "black",
        }}
      />
      <Paragraph>Login will go here</Paragraph>
    </>
  );
};
