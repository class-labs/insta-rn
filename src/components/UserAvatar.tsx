import { Avatar, Paragraph, View } from "tamagui";

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
        <View flex={1} jc="center" ai="center" backgroundColor="#e8e8e8">
          <Paragraph>{getInitials(name)}</Paragraph>
        </View>
      </Avatar.Fallback>
    </Avatar>
  );
}
