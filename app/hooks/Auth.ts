import { useState } from "react";

import { supabase } from "../libs/supabase/Supabase";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState(null);

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      setSession(data.session);
      setIsAuthenticated(true);
    }

    return { data, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setIsAuthenticated(false);
      setSession(null);
    }

    return { error };
  };

  const registerWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data) {
      setIsAuthenticated(true);
      setSession(data.session);
    }

    return { data, error };
  };

  const getSession = async () => {
    const response = await supabase.auth.getSession();

    if (response) {
      setIsAuthenticated(true);
      setSession(response.data.session);
    }

    return response.data.session;
  };

  return {
    isAuthenticated,
    session,
    loginWithEmail,
    logout,
    registerWithEmail,
    getSession,
  };
};

export default useAuth;
