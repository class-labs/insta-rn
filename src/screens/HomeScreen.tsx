import { useEffect } from "react";
import { Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut as IconLogOut, Plus as IconPlus } from "@tamagui/lucide-icons";

import { HomeFeed } from "../components/HomeFeed";
import { useAuth } from "../support/Auth";

export function HomeScreen() {
  const { authToken, setAuthToken } = useAuth();
  const isLoggedIn = authToken !== null;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return isLoggedIn ? (
          <Pressable
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
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
            style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate("Compose");
              } else {
                navigation.navigate("Login");
              }
            }}
          >
            <IconPlus />
          </Pressable>
        );
      },
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return <HomeFeed />;
}
