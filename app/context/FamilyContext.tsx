import { useAuth } from "@app/context/AuthContext";
import { supabase } from "@app/libs/supabase/Supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { createContext, ReactNode, useContext, useState } from "react";

type FamilyContextType = {
  initFamilyContext: () => Promise<void>;
  isJoinedFamily: boolean;
  setIsJoinedFamily: (isJoinedFamily: boolean) => void;
  createFamily: (name: string) => Promise<{ error: PostgrestError | string }>;
  joinFamily: (code: string) => Promise<{ error: PostgrestError | string }>;
  getFamily: () => Promise<{ data: any; error: PostgrestError | string }>;
};

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const FamilyProvider = ({ children }: { children: ReactNode }) => {
  const { getSession } = useAuth();
  const [isJoinedFamily, setIsJoinedFamily] = useState(false);

  const generateUniqueCode = async () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    let isUnique = false;

    while (!isUnique) {
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      isUnique =
        (await supabase.from("family").select("*").eq("code", code)).data
          .length === 0;
    }

    return code;
  };

  const initFamilyContext = async () => {
    const session = await getSession();
    if (!session) return;

    const { data } = await supabase
      .from("_familyToprofile")
      .select("*")
      .eq("B", session.user.id);

    setIsJoinedFamily(data.length > 0);
  };

  const joinFamily = async (
    code: string,
  ): Promise<{ error: PostgrestError | string }> => {
    const session = await getSession();
    if (!session) return { error: "Session invalide" };

    const { data, error: familyError } = await supabase
      .from("family")
      .select("*")
      .eq("code", code);

    if (familyError) return { error: familyError };

    if (data.length === 0) return { error: "Code invalide" };

    const { error } = await supabase.from("_familyToprofile").insert({
      A: data[0].id,
      B: session.user.id,
    });

    if (!error) setIsJoinedFamily(true);

    return { error };
  };

  const createFamily = async (
    name: string,
  ): Promise<{ error: PostgrestError | string }> => {
    const uniqueCode = await generateUniqueCode();

    const { error } = await supabase.from("family").insert({
      id: uuid(),
      name,
      code: uniqueCode,
      updatedAt: new Date().toISOString(),
    });

    if (error) return { error };

    return joinFamily(uniqueCode);
  };

  const getFamily = async () => {
    const session = await getSession();
    if (!session) return { data: null, error: "Session invalide" };

    const { data, error } = await supabase
      .from("_familyToprofile")
      .select("*")
      .eq("B", session.user.id);

    if (!error) setIsJoinedFamily(data.length > 0);

    return { data, error };
  };

  return (
    <FamilyContext.Provider
      value={{
        initFamilyContext,
        isJoinedFamily,
        setIsJoinedFamily,
        createFamily,
        joinFamily,
        getFamily,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export default FamilyProvider;

export const useFamily = () => useContext(FamilyContext);