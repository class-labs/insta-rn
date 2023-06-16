import { apiBase } from "../support/constants";

export function toUrl(path: string) {
  return apiBase + path;
}
