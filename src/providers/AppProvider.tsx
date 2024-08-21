import type { ReactNode } from "react";

import { FontProvider } from "./FontProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: ReactNode;
};

export function AppProvider(props: Props) {
  const { children } = props;
  return (
    <FontProvider>
      <ThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </FontProvider>
  );
}
