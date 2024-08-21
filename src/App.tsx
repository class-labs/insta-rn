import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";

import { LoginScreen } from "./components/LoginScreen";
import { PostDetails } from "./components/PostDetails";
import { SignupScreen } from "./components/SignupScreen";
import { AppProvider } from "./providers/AppProvider";
import { HomeScreen } from "./screens/HomeScreen";
import { NewPostScreen } from "./screens/NewPostScreen";
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
        <Stack.Screen
          name="PostDetails"
          options={{ title: "Post Details" }}
          component={PostDetails}
        />
        <Stack.Screen
          name="NewPost"
          options={{ title: "New Post" }}
          component={NewPostScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
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
