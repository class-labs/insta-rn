import { useRoute } from "@react-navigation/native";
import { Paragraph } from "tamagui";

export function PostDetailsScreen() {
  const route = useRoute();
  const params = Object(route.params);
  const postId = String(params.postId);
  return <Paragraph>Post details for Post ID: {postId}</Paragraph>;
}
