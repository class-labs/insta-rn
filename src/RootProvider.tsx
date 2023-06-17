import React, { ReactNode } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import config from "./config/tamagui.config";

const queryClient = new QueryClient();

export function RootProvider(props: { children: ReactNode }) {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TamaguiProvider config={config} disableInjectCSS>
      <Theme name="light">
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
