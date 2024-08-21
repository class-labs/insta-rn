import { Pressable, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Plus } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";

import { AppProvider } from "./providers/AppProvider";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { PostDetailsScreen } from "./screens/PostDetailsScreen";
import { useAuth } from "./support/Auth";
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
        <Stack.Screen
          name="Home"
          options={{
            headerRight: () => <HomeHeaderRight />,
          }}
          component={HomeScreen}
        />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
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

function HomeHeaderRight() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  return (
    <Pressable
      onPress={() => {
        if (isLoggedIn) {
          navigation.navigate("NewPost");
        } else {
          navigation.navigate("Login");
        }
      }}
    >
      <Plus />
    </Pressable>
  );
}
