import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LoginDto, RegisterDto, UserDto } from "../models/account";
import { accountApi } from "../api/accountApi";

type AuthContextValue = {
  user: UserDto | null;
  isLoading: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => void;
  refreshCurrentUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSession = (u: UserDto | null) => {
    setUser(u);
    if (u?.token) localStorage.setItem("token", u.token);
    else localStorage.removeItem("token");
  };

  const refreshCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSession(null);
      return;
    }
    const u = await accountApi.current();
    setSession(u);
  };

  useEffect(() => {
    (async () => {
      try {
        await refreshCurrentUser();
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    login: async (dto) => {
      const u = await accountApi.login(dto);
      setSession(u);
    },
    register: async (dto) => {
      const u = await accountApi.register(dto);
      setSession(u);
    },
    logout: () => setSession(null),
    refreshCurrentUser,
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
