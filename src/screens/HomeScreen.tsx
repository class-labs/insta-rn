import { useState } from "react";
import { Button, Paragraph, View } from "tamagui";

import { Post } from "../types/Post";

async function getPosts() {
  const response = await fetch("https://insta-api.web-api.dev/posts");
  const jsonData = await response.json();
  return jsonData as Array<Post>;
}

export function HomeScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  return (
    <View padding={20} gap={20}>
      <Button
        onPress={async () => {
          const posts = await getPosts();
          setPosts(posts);
        }}
      >
        Click to get posts
      </Button>
      {posts.map((post) => {
        return <Paragraph key={post.id}>{post.caption}</Paragraph>;
      })}
    </View>
  );
}
