import { User } from "../types/User";
import { toUrl } from "./toUrl";

type SignupResult = { success: true; user: User; token: string };

export async function sendSignup(payload: {
  name: string;
  profilePhoto?: string;
  username: string;
  password: string;
}) {
  const { name, profilePhoto, username, password } = payload;
  const response = await fetch(toUrl("/signup"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name,
      profilePhoto,
      username,
      password,
    }),
  });
  // @ts-expect-error
  const result: SignupResult = await response.json();
  return result;
}
