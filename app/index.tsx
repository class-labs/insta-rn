import { Stack } from "expo-router";
import { Paragraph } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../src/api/getPosts";
import { HomeFeed } from "../src/components/HomeFeed";

export default () => {
  const { data, error, isLoading, refetch } = useQuery(["posts"], getPosts);
  if (error) {
    return <Paragraph>{String(error)}</Paragraph>;
  }
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      {!data ? (
        <Paragraph>Loading...</Paragraph>
      ) : (
        <HomeFeed
          posts={data}
          isRefreshing={isLoading}
          onRefresh={() => refetch()}
        />
      )}
    </>
  );
};
