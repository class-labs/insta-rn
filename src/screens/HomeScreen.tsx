import { Button, Paragraph, View } from "tamagui";

async function getPosts() {
  // TODO: Use fetch() to get the posts
  // The URL is: https://insta-api.web-api.dev/posts
}

export function HomeScreen() {
  return (
    <View padding={20} gap={20}>
      <Button
        onPress={() => {
          // TODO: Fetch posts.
        }}
      >
        Click to get posts
      </Button>
      <Paragraph>A list of "post.caption" should go here</Paragraph>
    </View>
  );
}
