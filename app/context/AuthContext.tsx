import { supabase } from "@app/libs/supabase/Supabase";
import {
  AuthError,
  AuthTokenResponsePassword,
  Session,
} from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AuthContextType = {
  initAuthContext: () => Promise<void>;
  isAuthenticated: boolean;
  loginWithEmail: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  logout: () => Promise<{ error: AuthError }>;
  registerWithEmail: (email: string, password: string) => Promise<any>;
  getSession: () => Promise<Session>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initAuthContext = async () => {
    const session = await getSession();
    setIsAuthenticated(session !== null);
  };

  const getSession = async (): Promise<Session> => {
    const response = await supabase.auth.getSession();

    if (response) {
      setIsAuthenticated(true);
    }

    return response.data.session;
  };

  const loginWithEmail = async (
    email: string,
    password: string,
  ): Promise<AuthTokenResponsePassword> => {
    const authResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authResponse.data) {
      setIsAuthenticated(true);
    }

    return authResponse;
  };

  const logout = async (): Promise<{ error: AuthError }> => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setIsAuthenticated(false);
    }

    return { error };
  };

  const registerWithEmail = async (
    email: string,
    password: string,
  ): Promise<any> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data) {
      setIsAuthenticated(true);
    }

    return { data, error };
  };

  const value = useMemo(
    () => ({
      initAuthContext,
      getSession,
      loginWithEmail,
      logout,
      registerWithEmail,
      isAuthenticated,
    }),
    [
      initAuthContext,
      getSession,
      loginWithEmail,
      logout,
      registerWithEmail,
      isAuthenticated,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
