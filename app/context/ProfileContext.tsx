import { useAuth } from "@app/context/AuthContext";
import { supabase } from "@app/libs/supabase/Supabase";
import { profile } from "@prisma/client";
import { createContext, ReactNode, useContext } from "react";

type ProfileContextType = {
  updateProfile: (
    lastname: string,
    firstname: string,
    birthdate: Date,
  ) => Promise<void>;
  getProfile: () => Promise<profile>;
  getProfileById: (profileId: string) => Promise<profile>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { getSession } = useAuth();

  const updateProfile = async (
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

    const profile: profile = {
      id: data.id,
      lastname: data.lastname,
      firstname: data.firstname,
      birthdate: new Date(data.birthdate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    return profile;
  };

  const getProfileById = async (profileId: string) => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", profileId)
      .single();

    if (error) throw error;

    const profile: profile = {
      id: data.id,
      lastname: data.lastname,
      firstname: data.firstname,
      birthdate: new Date(data.birthdate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    return profile;
  };

  return (
    <ProfileContext.Provider
      value={{
        updateProfile,
        getProfile,
        getProfileById,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileContext);
