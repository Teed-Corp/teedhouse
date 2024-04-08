import { PrismaClient } from "@prisma/client";
import useAuth from "@app/hooks/Auth";

const useFamily = () => {
  const prisma = new PrismaClient();
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
        (await prisma.family.findUnique({
          where: {
            code,
          },
        })) === null;
    }

    return code;
  };
  const createFamily = async (name: string) => {
    try {
      return await prisma.family.create({
        data: {
          name,
          code: await generateUniqueCode(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const joinFamily = async (code: string) => {
    const session = await auth.getSession();

    if (!session) {
      throw new Error("User not logged in");
    }

    const user = await prisma.profile.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const family = await prisma.family.findUnique({
      where: {
        code,
      },
    });

    if (!family) {
      throw new Error("Family not found");
    }

    return prisma.profile.update({
      where: {
        id: user.id,
      },
      data: {
        family: family as any,
      },
    });
  };

  return {
    createFamily,
    joinFamily,
  };
};

export default useFamily;
