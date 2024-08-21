import type { ReactNode } from "react";

import { AuthProvider } from "../support/Auth";
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
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </FontProvider>
  );
}
