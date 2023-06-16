import { toUrl } from "./toUrl";
import { User } from "../types/User";

type LoginResult =
  | { success: false }
  | { success: true; user: User; token: string };

export async function sendLogin(
  username: string,
  password: string,
): Promise<LoginResult> {
  const response = await fetch(toUrl("/login"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
}
