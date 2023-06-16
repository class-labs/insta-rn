import { getAuthToken } from "../support/Auth";

export function getAuthHeaders(): Record<string, string> {
  const authToken = getAuthToken();
  return authToken ? { authorization: `Bearer ${authToken}` } : {};
}
