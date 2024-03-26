import { useState } from "react";

import { supabase } from "../utils/Supabase";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    if (data) {
      setUser(data.user);
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const registerWithEmail = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: "John Doe",
        },
      },
    });

    if (error) {
      setError(error.message);
    }

    if (data) {
      setUser(data.user);
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  return {
    loading,
    user,
    error,
    isAuthenticated,
    loginWithEmail,
    logout,
    registerWithEmail,
  };
};

export default useAuth;
