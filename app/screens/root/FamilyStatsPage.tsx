import PieceComponent from "@app/components/common/Content/PieceComponent";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import TaskItemComponent from "@app/components/root/task/TaskItemComponent";
import { useFamily } from "@app/context/FamilyContext";
import Theme from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

const FamilyStatsPage = () => {
  const { getCompletedTasks, getFamilyCompletedTasksScore } = useFamily();

  const [isLoading, setIsLoading] = useState(true);
  const [familyScore, setFamilyScore] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCompletedTasks((await getCompletedTasks()).data);
      setFamilyScore(await getFamilyCompletedTasksScore());

      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  if (isLoading) return <CustomLoader />;

  return (
    <View className="mx-5">
      <LinearGradient
        className="w-full h-36 items-center rounded-2xl p-5"
        colors={[Theme.primary, Theme.gradientColor]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-white text-sm">Tâches effectuées</Text>
          <Text className="text-white text-sm">{0.65 * 100}%</Text>
        </View>
        <Divider height={12} />
        <View className="w-full h-3">
          <ProgressBar
            className="bg-[#e8ede91a] h-full rounded-xl"
            progress={0.65}
            visible
            color="white"
          />
        </View>
        <Divider height={16} />
        <View className="w-full flex flex-row justify-center items-center rounded-xl bg-[#e8ede91a] p-3">
          <Text className="text-white text-lg">Score total : </Text>
          <Text className="text-white text-xl font-bold">{familyScore}</Text>
          <Divider width={8} />
          <PieceComponent />
        </View>
      </LinearGradient>
      <Divider height={24} />
      {completedTasks.map((task) => {
        return <TaskItemComponent key={task.id} item={task} />;
      })}
    </View>
  );
};

export default FamilyStatsPage;
