import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";

import { AppProvider } from "./providers/AppProvider";
import { HomeScreen } from "./screens/HomeScreen";
import { RootStackParamList } from "./types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

function ThemedNavigationContainer() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  // For some reason Tamagui's default background in light mode is #f8f8f8
  const backgroundColor =
    colorScheme === "dark" ? theme.background.get() : "white";
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.color.get(),
          headerBackTitleVisible: false,
          contentStyle: { backgroundColor },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function App() {
  return (
    <AppProvider>
      <ThemedNavigationContainer />
    </AppProvider>
  );
}
