import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Paragraph, Spinner, View } from "tamagui";

import { Post } from "../types/Post";

async function getPosts() {
  const response = await fetch("https://insta-api.web-api.dev/posts");
  if (response.status !== 200) {
    throw new Error(`Unexpected response status ${response.status}`);
  }
  const jsonData = await response.json();
  return jsonData as Array<Post>;
}

export function HomeScreen() {
  const { isLoading, error, data } = useQuery(["getPosts"], getPosts);

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
    <View padding={20} gap={20}>
      {data.map((post) => {
        return <Paragraph key={post.id}>{post.caption}</Paragraph>;
      })}
    </View>
  );
}
