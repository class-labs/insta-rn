import { Alert, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  Plus as IconPlus,
  LogOut as IconLogOut,
  LogIn as IconLogIn,
} from "@tamagui/lucide-icons";
import { HomeFeed } from "../src/components/HomeFeed";
import { useAuth } from "../src/support/Auth";

export default () => {
  const { authToken, setAuthToken } = useAuth();
  const isLoggedIn = authToken !== null;
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
          headerTintColor: "black",
          headerLeft: () => {
            return isLoggedIn ? (
              <Pressable
                style={({ pressed }) =>
                  pressed ? { opacity: 0.5 } : undefined
                }
                onPress={() => {
                  setAuthToken(null);
                  Alert.alert("Logged Out", "You have been logged out.");
                }}
              >
                <IconLogOut />
              </Pressable>
            ) : null;
          },
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
                {isLoggedIn ? <IconPlus /> : <IconLogIn />}
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
