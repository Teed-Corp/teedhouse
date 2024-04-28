import { useAuth } from "@app/context/AuthContext";
import { supabase } from "@app/libs/supabase/Supabase";
import { profile } from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

type ProfileContextType = {
  createProfile: (
    lastname: string,
    firstname: string,
    birthdate: Date,
  ) => Promise<void>;
  getProfile: () => Promise<profile>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { getSession } = useAuth();

  const createProfile = async (
    lastname: string,
    firstname: string,
    birthdate: Date,
  ) => {
    const session = await getSession();

    if (!session) {
      throw new Error("No session");
    }

    await supabase
      .from("profile")
      .update({
        lastname,
        firstname,
        birthdate,
      })
      .eq("id", session.user.id);
  };

  const getProfile = async () => {
    const session = await getSession();

    if (!session) {
      throw new Error("No session");
    }

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) throw error;

    return data;
  };

  return (
    <ProfileContext.Provider
      value={{
        createProfile,
        getProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
