import { act, fireEvent, render } from "@testing-library/react-native";

import { ThemeProvider } from "../providers/ThemeProvider";
import { HomeScreen } from "../screens/HomeScreen";

describe("HomeScreen", () => {
  test("Text renders correctly on HomeScreen", async () => {
    const { getByText, getByRole } = render(
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>,
    );

    const button = getByRole("button");
    expect(button).toBeTruthy();

    await act(() => fireEvent.press(button));

    const paragraph = getByText("Hello world!");
    expect(paragraph).toBeTruthy();
  });
});
