import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const mockJwtDecode = (token: string): { email: string; exp: number } => {
  const mockEmail = token.startsWith("mock-token-")
    ? token.substring(11)
    : "user@example.com";
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  return { email: mockEmail, exp };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      let token: string | null = null;
      try {
        token = await AsyncStorage.getItem("userToken");
        if (token) {
          const decoded = mockJwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp > currentTime) {
            setUser({ email: decoded.email });
          } else {
            await AsyncStorage.removeItem("userToken");
          }
        }
      } catch (e) {
        console.error("Failed to load token or decode JWT:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async (token: string, email: string) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setUser({ email: email });
    } catch (e) {
      console.error("Failed to save token:", e);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUser(null);
    } catch (e) {
      console.error("Failed to remove token:", e);
    }
  };

  const authContextValue = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signOut,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
