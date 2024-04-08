import useAuth from "@app/hooks/Auth";
import { supabase } from "@app/libs/supabase/Supabase";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

const useFamily = () => {
  const auth = useAuth();

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
  const createFamily = async (name: string) => {
    const { data, error } = await supabase.from("family").insert({
      id: uuid(),
      name,
      code: await generateUniqueCode(),
      updatedAt: new Date().toISOString(),
    });

    return { data, error };
  };

  const joinFamily = async (code: string) => {
    const session = await auth.getSession();
    console.log(session);
    if (!session) return { error: "Vous devez être connecté" };

    const { data: family, error: familyError } = await supabase
      .from("family")
      .select("*")
      .eq("code", code);

    if (familyError) return { familyError };

    if (family.length === 0) return { error: "Code invalide" };

    const { data, error } = await supabase.from("_familyToprofile").insert({
      A: family[0].id,
      B: session.user.id,
    });

    return { data, error };
  };

  return {
    createFamily,
    joinFamily,
  };
};

export default useFamily;
