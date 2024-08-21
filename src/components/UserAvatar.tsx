import { Avatar, Paragraph, YStack } from "tamagui";

import { getInitials } from "../support/getInitials";
import { User } from "../types/User";

type Props = {
  user: User;
  size?: "sm" | "md";
};

export function UserAvatar(props: Props) {
  const { user, size } = props;
  const { name, profilePhoto } = user;
  return (
    <Avatar circular size={size === "sm" ? "$3" : "$4"}>
      {profilePhoto ? <Avatar.Image source={{ uri: profilePhoto }} /> : null}
      <Avatar.Fallback>
        <YStack flex={1} jc="center" ai="center" backgroundColor="#e8e8e8">
          <Paragraph>{getInitials(name)}</Paragraph>
        </YStack>
      </Avatar.Fallback>
    </Avatar>
  );
}
