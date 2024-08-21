import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Image, Paragraph, ScrollView, Spinner, View } from "tamagui";

import { getPosts } from "../api/getPosts";

export function HomeScreen() {
  const { isLoading, error, data } = useQuery(["getPosts"], getPosts);
  const navigation = useNavigation();

  if (error) {
    return (
      <View padding={20} alignItems="center">
        <Paragraph>{String(error)}</Paragraph>
      </View>
    );
  }

  if (isLoading || !data) {
    return (
      <View padding={20} alignItems="center">
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView>
      <View gap={20}>
        {data.map((post) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("PostDetails", { postId: post.id });
              }}
              key={post.id}
            >
              <View>
                <Image aspectRatio={1} source={{ uri: post.photo }} />
                <Paragraph paddingHorizontal={20}>{post.caption}</Paragraph>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
