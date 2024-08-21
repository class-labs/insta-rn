import { useEffect } from "react";
import { Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut as IconLogOut, Plus as IconPlus } from "@tamagui/lucide-icons";

import { HomeFeed } from "../components/HomeFeed";
import { useAuth } from "../support/Auth";

function HeaderLeft() {
  const { isLoggedIn, setAuthToken } = useAuth();
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
}

function HeaderRight() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  return (
    <Pressable
      style={({ pressed }) => (pressed ? { opacity: 0.5 } : undefined)}
      onPress={() => {
        if (isLoggedIn) {
          navigation.navigate("NewPost");
        } else {
          navigation.navigate("Login");
        }
      }}
    >
      <IconPlus />
    </Pressable>
  );
}

export function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return <HomeFeed />;
}
