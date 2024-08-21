import { useState } from "react";
import { Button } from "react-native";
import { Paragraph, ScrollView, View } from "tamagui";

export function HomeScreen() {
  const [isPressed, setPressed] = useState(false);
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ScrollView>
        <Button
          title="Click Here"
          onPress={() => {
            setPressed(true);
          }}
        />
        {isPressed ? <Paragraph>Hello world!</Paragraph> : null}
      </ScrollView>
    </View>
  );
}
