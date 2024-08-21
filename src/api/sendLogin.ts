import { User } from "../types/User";
import { toUrl } from "./toUrl";

type LoginResult =
  | { success: false }
  | { success: true; user: User; token: string };

export async function sendLogin(username: string, password: string) {
  const response = await fetch(toUrl("/login"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  // @ts-expect-error
  const result: LoginResult = await response.json();
  return result;
}
