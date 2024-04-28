import PieceComponent from "@app/components/common/Content/PieceComponent";
import { useFamily } from "@app/context/FamilyContext";
import { useProfile } from "@app/context/ProfileContext";
import { completed_task, profile, task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const TaskItemComponent = ({ item }: { item: completed_task }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<profile>(null);
  const [task, setTask] = useState<task>(null);
  const { getProfileById } = useProfile();
  const { getTaskById } = useFamily();

  useEffect(() => {
    const fetch = async () => {
      setProfile(await getProfileById(item.profileId));
      setTask((await getTaskById(item.taskId)).data);
      setIsLoading(false);
    };

    fetch().catch(console.error);
  }, []);

  if (isLoading) return null;

  return (
    <View className="flex flex-row bg-[#f9f9f9] w-full items-center p-5 mb-3 rounded-3xl">
      {/*{item.type === "car" ? (*/}
      {/*  <CarIcon />*/}
      {/*) : item.type === "shopping" ? (*/}
      {/*  <ShoppingIcon />*/}
      {/*) : (*/}
      {/*  <HouseHoldIcon />*/}
      {/*)}*/}
      <View className="flex-1">
        <Text className="text-lg font-bold">{task.name}</Text>
        <Text className="text-sm">{profile.firstname}</Text>
      </View>
      <View className="flex flex-row items-end">
        <View className="w-8 h-8 rounded-3xl mr-2">
          <PieceComponent />
        </View>
        <View className="items-center justify-center h-8">
          <Text className="text-lg font-bold">{task.points}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaskItemComponent;
