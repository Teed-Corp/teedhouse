import { useAuth } from "@app/context/AuthContext";
import { supabase } from "@app/libs/supabase/Supabase";
import { completed_task, family, profile, task } from "@prisma/client";
import { PostgrestError } from "@supabase/supabase-js";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import * as Crypto from "expo-crypto";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import defaultTask from "../../assets/defaultTasks.json";

type FamilyContextType = {
  initFamilyContext: () => Promise<void>;
  isJoinedFamily: boolean;
  setIsJoinedFamily: (isJoinedFamily: boolean) => void;
  createFamily: (
    name: string,
    loadDefaultTask: boolean,
  ) => Promise<{ error: PostgrestError | string }>;
  joinFamily: (code: string) => Promise<{ error: PostgrestError | string }>;
  getFamily: () => Promise<{ data: family; error: PostgrestError | string }>;
  getFamilyMembers: () => Promise<{
    data: profile[];
    error: PostgrestError | string;
  }>;
  getFamilyTasks: () => Promise<{
    data: task[];
    error: PostgrestError | string;
  }>;
  getCompletedTasks: () => Promise<{
    data: completed_task[];
    error: PostgrestError | string;
  }>;
  getUserCompletedTasks: () => Promise<{
    data: completed_task[];
    error: PostgrestError | string;
  }>;
  getTaskById: (
    taskId: string,
  ) => Promise<{ data: task; error: PostgrestError }>;
  getUserCompletedTasksScore: () => Promise<number>;
  completeTask: (
    taskId: string,
    userId: string,
  ) => Promise<{ error: PostgrestError | string }>;
  getFamilyCompletedTasksScore: () => Promise<number>;
  deleteCompletedTask: (
    taskId: string,
  ) => Promise<{ error: PostgrestError | string }>;
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
          Math.floor((Crypto.getRandomBytes(1)[0] / 255) * characters.length),
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

    setIsJoinedFamily(data && data.length > 0);
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
    loadDefaultTask: boolean,
  ): Promise<{ error: PostgrestError | string }> => {
    const familyId = uuid();
    const uniqueCode = await generateUniqueCode();

    const { error } = await supabase.from("family").insert({
      id: familyId,
      name,
      code: uniqueCode,
      updatedAt: new Date().toISOString(),
    });

    if (loadDefaultTask) {
      for (const task of defaultTask) {
        const { error } = await supabase.from("task").insert({
          id: uuid(),
          name: task.name,
          points: task.points,
          familyId,
        });

        if (error) return { error };
      }
    }

    if (error) return { error };

    return joinFamily(uniqueCode);
  };

  const getFamily = async () => {
    const session = await getSession();
    if (!session) return { data: null, error: "Session invalide" };

    const familyToProfile = await supabase
      .from("_familyToprofile")
      .select("*")
      .eq("B", session.user.id);

    const { data, error } = await supabase
      .from("family")
      .select("*")
      .eq("id", familyToProfile.data[0].A)
      .single();

    return { data: data as unknown as family, error };
  };

  const getFamilyTasks = async () => {
    const family = await getFamily();

    if (family.error) return { data: null, error: "Famille non trouvé" };

    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("familyId", family.data.id);

    return { data: data as task[], error };
  };

  const getCompletedTasks = async () => {
    const family = await getFamily();

    if (family.error) return { data: null, error: "Famille non trouvé" };

    const tasks = await getFamilyTasks();

    if (tasks.error) return { data: null, error: "Tâches non trouvé" };

    const taskIds = tasks.data.map((task: task) => task.id);

    const { data, error } = await supabase
      .from("completed_task")
      .select("*")
      .in("taskId", taskIds);

    return { data: data as completed_task[], error };
  };

  const getUserCompletedTasks = async () => {
    const session = await getSession();

    if (!session) return { data: null, error: "Session invalide" };

    const { data, error } = await supabase
      .from("completed_task")
      .select("*")
      .eq("profileId", session.user.id);

    return { data: data as completed_task[], error };
  };

  const getTaskById = async (taskId: string) => {
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("id", taskId)
      .single();

    return { data: data as unknown as task, error };
  };

  const getUserCompletedTasksScore = async () => {
    const session = await getSession();

    if (!session) return 0;

    const userCompletedTasks = await getUserCompletedTasks();

    let score = 0;
    for (const userCompletedTask of userCompletedTasks.data) {
      const task = await getTaskById(userCompletedTask.taskId);
      score += task.data.points;
    }

    return score;
  };

  const getFamilyMembers = async () => {
    const session = await getSession();
    if (!session) return { data: null, error: "Session invalide" };

    const familyId = await supabase
      .from("_familyToprofile")
      .select("*")
      .eq("B", session.user.id)
      .single();

    const profileIds = await supabase
      .from("_familyToprofile")
      .select("*")
      .eq("A", familyId.data.A);

    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .in(
        "id",
        profileIds.data.map((profile) => profile.B),
      );

    return { data: data as unknown as profile[], error };
  };

  const completeTask = async (taskId: string, userId: string) => {
    const session = await getSession();

    if (!session) return { error: "Session invalide" };

    const { error } = await supabase.from("completed_task").insert({
      id: uuid(),
      taskId,
      profileId: userId,
      completedAt: new Date().toISOString(),
    });

    return { error };
  };

  const getFamilyCompletedTasksScore = async () => {
    const completedTasks = await getCompletedTasks();

    let score = 0;
    for (const completedTask of completedTasks.data) {
      const task = await getTaskById(completedTask.taskId);
      score += task.data.points;
    }

    return score;
  };

  const deleteCompletedTask = async (taskId: string) => {
    const session = await getSession();

    if (!session) return { error: "Session invalide" };

    const { error } = await supabase
      .from("completed_task")
      .delete()
      .eq("id", taskId);

    return { error };
  };

  const value = useMemo(
    () => ({
      initFamilyContext,
      isJoinedFamily,
      setIsJoinedFamily,
      createFamily,
      joinFamily,
      getFamily,
      getFamilyTasks,
      getCompletedTasks,
      getUserCompletedTasks,
      getTaskById,
      getUserCompletedTasksScore,
      getFamilyMembers,
      completeTask,
      getFamilyCompletedTasksScore,
      deleteCompletedTask,
    }),
    [
      initFamilyContext,
      isJoinedFamily,
      setIsJoinedFamily,
      createFamily,
      joinFamily,
      getFamily,
      getFamilyTasks,
      getCompletedTasks,
      getUserCompletedTasks,
      getTaskById,
      getUserCompletedTasksScore,
      getFamilyMembers,
      completeTask,
      getFamilyCompletedTasksScore,
      deleteCompletedTask,
    ],
  );

  return (
    <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>
  );
};

export default FamilyProvider;

export const useFamily = () => useContext(FamilyContext);
