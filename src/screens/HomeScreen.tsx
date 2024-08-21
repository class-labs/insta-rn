import { useEffect } from "react";
import { Alert, Pressable, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut as IconLogOut, Plus as IconPlus } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { Paragraph, ScrollView } from "tamagui";

import { getPosts } from "../api/getPosts";
import { FeedPostItem } from "../components/FeedPostItem";
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
  const { data, error, isLoading, refetch } = useQuery(["posts"], getPosts);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  if (error) {
    return <Paragraph>{String(error)}</Paragraph>;
  }
  if (!data) {
    return <Paragraph>Loading...</Paragraph>;
  }
  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {data.map((post) => (
        <FeedPostItem key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}
