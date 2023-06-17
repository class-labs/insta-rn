import { toUrl } from "./toUrl";
import { User } from "../types/User";

type SignupResult = { success: true; user: User; token: string };

export async function sendSignup(payload: {
  name: string;
  profilePhoto?: string;
  username: string;
  password: string;
}): Promise<SignupResult> {
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
  return await response.json();
}
