import { Stack } from "expo-router";
import { Paragraph } from "tamagui";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "New Post",
          headerTintColor: "black",
        }}
      />
      <Paragraph>Compose will go here</Paragraph>
    </>
  );
};
