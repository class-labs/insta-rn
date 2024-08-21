import { ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@auth-token";

let authToken: string | null = null;

// A set of functions that will be invoked when the auth token changes
const listeners = new Set<() => void>();

export function getAuthToken() {
  return authToken;
}

function setAuthToken(token: string | null) {
  authToken = token;
  if (token === null) {
    AsyncStorage.removeItem(STORAGE_KEY);
  } else {
    AsyncStorage.setItem(STORAGE_KEY, token);
  }
  for (const listener of listeners) {
    listener();
  }
}

function addListener(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function AuthProvider(props: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((token) => {
      authToken = token;
      setLoading(false);
    });
  }, []);
  if (isLoading) {
    return null;
  }
  return <>{props.children}</>;
}

export function useAuth() {
  const [authToken, setLocalToken] = useState(() => getAuthToken());
  useEffect(() => {
    return addListener(() => {
      const newToken = getAuthToken();
      setLocalToken(newToken);
    });
  }, []);
  const isLoggedIn = authToken !== null;
  return { isLoggedIn, authToken, setAuthToken };
}
