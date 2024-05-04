import PieceComponent from "@app/components/common/Content/PieceComponent";
import Divider from "@app/components/common/Divider";
import { useFamily } from "@app/context/FamilyContext";
import { useProfile } from "@app/context/ProfileContext";
import { completed_task, profile, task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const TaskItemComponent = ({ item }: { item: completed_task }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<profile>(null);
  const [task, setTask] = useState<task>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
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
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-[#00000080] justify-center items-center"
          onPress={toggleModal}
          activeOpacity={1}
        >
          <View className="w-90 h-full mx-8 justify-center items-center">
            <View className="bg-white p-5 rounded-lg h-74">
              <Text className="text-lg font-bold mb-4 text-center text-primary">
                {task.name}
              </Text>
              <View className="mb-4 justify-center items-center text-primary">
                {/*{item.type === "car" ? (*/}
                {/*  <CarIcon />*/}
                {/*) : item.type === "shopping" ? (*/}
                {/*  <ShoppingIcon />*/}
                {/*) : (*/}
                {/*  <HouseHoldIcon />*/}
                {/*)}*/}
              </View>
              <Divider height={10} />
              <View className="items-start">
                <Text className="text-sm font-bold mb-4 text-center text-primary">
                  Réaliser par: {profile.firstname}
                </Text>
                <Text className="text-sm font-bold mb-4 text-center text-primary">
                  Points à gagner: {task.points}
                </Text>
                <Text className="text-sm font-bold mb-4 text-center text-primary">
                  Date de la tâche: {task.createdAt.toDateString()}
                </Text>
              </View>
              <Divider height={10} />
              <View style={{ flexDirection: "row", width: "80%" }}>
                <TouchableOpacity
                  className="bg-red-500 py-2 px-4 rounded-md"
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text className="text-lg text-white">Supprimer</Text>
                </TouchableOpacity>
                <Divider width={100} />
                <TouchableOpacity
                  className="bg-green-500 py-2 px-4 rounded-md"
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text className="text-lg text-white">Terminer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default TaskItemComponent;
