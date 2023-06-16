import { Stack } from "expo-router";

import { LoginForm } from "../src/components/LoginForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Login",
          headerTintColor: "black",
        }}
      />
      <LoginForm />
    </>
  );
};
