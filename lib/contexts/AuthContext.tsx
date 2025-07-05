"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  userId?: string;
  token?: string;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check if we have auth data in localStorage
    if (typeof window !== "undefined") {
      try {
        const savedAuth = localStorage.getItem("auth-state");
        if (savedAuth) {
          return JSON.parse(savedAuth);
        }
      } catch (error) {
        console.error("Error reading auth state from localStorage:", error);
      }
    }
    return defaultAuthState;
  });

  const login = (token: string, userId: string) => {
    const newState = {
      isAuthenticated: true,
      userId,
      token,
    };
    setAuthState(newState);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-state", JSON.stringify(newState));
    }
  };

  const logout = () => {
    setAuthState(defaultAuthState);

    // Clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-state");
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
