"use client";
import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const AuthContext = React.createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = getSupabaseBrowser();
    let cancelled = false;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!cancelled) {
        setUser(data.user ?? null);
        setLoading(false);
      }
    }
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setUser(session?.user ?? null);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}


