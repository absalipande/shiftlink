"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SessionUser } from "@/lib/types";

type AuthContextValue = {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

const SESSION_KEY = "shiftlink.session";
const COOKIE_KEY = "shiftlink_session";

const accounts: Array<SessionUser & { password: string }> = [
  { email: "pro@shiftlink.com", password: "ShiftLink123!", name: "Amiel Pro", type: "professional" },
  { email: "facility@shiftlink.com", password: "ShiftLink123!", name: "Alex Facility", type: "facility" },
];

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      setUser(JSON.parse(raw) as SessionUser);
    }
    setLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: (email: string, password: string) => {
        const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
        if (!account) {
          return { ok: false, message: "Invalid credentials." };
        }
        const nextUser: SessionUser = { email: account.email, name: account.name, type: account.type };
        setUser(nextUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
        document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify({ type: nextUser.type }))}; path=/; max-age=604800; samesite=lax`;
        return { ok: true };
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
        document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
