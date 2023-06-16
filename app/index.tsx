import { Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Plus as IconPlus } from "@tamagui/lucide-icons";
import { HomeFeed } from "../src/components/HomeFeed";
import { useAuth } from "../src/support/Auth";

export default () => {
  const { authToken } = useAuth();
  const isLoggedIn = authToken !== null;
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerTintColor: "black",
          headerRight: () => {
            return (
              <Pressable
                style={({ pressed }) =>
                  pressed ? { opacity: 0.5 } : undefined
                }
                onPress={() => {
                  if (isLoggedIn) {
                    router.push("/compose");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                <IconPlus />
              </Pressable>
            );
          },
          headerBackTitleVisible: false,
        }}
      />
      <HomeFeed />
    </>
  );
};
