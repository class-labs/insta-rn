import { Stack } from "expo-router";

import { SignupForm } from "../src/components/SignupForm";

export default () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Create an Account",
          headerTintColor: "black",
        }}
      />
      <SignupForm />
    </>
  );
};
