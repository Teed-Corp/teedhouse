import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import PieceComponent from "@app/components/common/Content/PieceComponent";
import ProfilePicture from "@app/components/common/Content/ProfilePicture";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import HomePageMenuItem from "@app/components/root/home/HomePageMenuItem";
import TaskItemComponent from "@app/components/root/task/TaskItemComponent";
import { useFamily } from "@app/context/FamilyContext";
import { useProfile } from "@app/context/ProfileContext";
import { Root } from "@app/navigation/routes";
import Theme from "@app/theme/Theme";
import { completed_task, profile } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const navigation: any = useNavigation();
  const { getProfile } = useProfile();
  const {
    getCompletedTasks,
    getUserCompletedTasks,
    getUserCompletedTasksScore,
  } = useFamily();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<profile>(null);
  const [myTasks, setMyTasks] = useState<completed_task[]>([]);
  const [otherTasks, setOtherTasks] = useState<completed_task[]>([]);
  const [userScore, setUserScore] = useState(0);

  const displayFamilyProgess = 0.5 * 100;
  const displayPersonalProgress = 0.23 * 100;

  const handlePressMyTasks = () => {
    navigation.navigate(Root.MyTaskPage, {
      title: "Mes tâches",
      taskList: otherTasks,
    });
  };

  const handlePressOtherTasks = () => {
    navigation.navigate(Root.OtherTaskPage, {
      title: "Autres tâches",
      taskList: otherTasks,
    });
  };

  const handlePressStats = () => {
    navigation.navigate(Root.FamilyStatsPage);
  };

  const handlePressProfile = () => {
    navigation.navigate(Root.AccountPage);
  };

  useEffect(() => {
    const fetch = async () => {
      const profile = await getProfile();
      setProfile(profile);
      setMyTasks((await getUserCompletedTasks()).data);
      setOtherTasks(
        (await getCompletedTasks()).data.filter(
          (task) => task.profileId !== profile.id,
        ),
      );
      setUserScore(await getUserCompletedTasksScore());
      setIsLoading(false);
    };

    fetch().catch(console.error);
  }, []);

  if (isLoading)
    return (
      <View className="justify-center align-middle w-full h-full">
        <CustomLoader />
      </View>
    );

  return (
    <SafeAreaView className="w-full h-full p-4">
      <View className="w-full h-20 flex flex-row justify-between items-center mx-auto py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handlePressProfile}>
            <ProfilePicture
              uri={`https://ui-avatars.com/api/?name=${profile.lastname + " " + profile.firstname}`}
              imageStyle="h-12 w-12 rounded-full"
            />
          </TouchableOpacity>
          <Divider width={16} />
          <View className="flex flex-col h-full justify-between">
            <Text className="text-lg">Bonjour</Text>
            <Text className="text-xl font-bold">{profile.firstname}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handlePressStats}>
          <HeaderIcon icon="trophy" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Divider height={20} />
        <LinearGradient
          className="w-full items-center justify-center rounded-2xl p-5"
          colors={[Theme.primary, Theme.gradientColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="text-white text-lg font-bold">
              {displayFamilyProgess}% des tâches de la semaine ont été réalisées
            </Text>
          </View>
          <Divider height={10} />
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="text-white text-sm">
              Vous avez effectué {displayPersonalProgress}% sur{" "}
              {displayFamilyProgess}%
            </Text>
          </View>
          <Divider height={8} />
          <View className="w-full h-2">
            <ProgressBar
              className="h-full rounded-lg bg-gray-400"
              progress={0.5}
              visible
              color="white"
            />
          </View>
          <Divider height={10} />
          <View className="w-full flex flex-row justify-center items-center rounded-lg bg-[#e8ede91a] p-2">
            <Text className="text-white text-lg">Mon score : </Text>
            <Text className="text-white text-xl font-bold">{userScore}</Text>
            <Divider width={8} />
            <PieceComponent />
          </View>
        </LinearGradient>
        <Divider height={24} />
        <HomePageMenuItem name="Mes tâches" onPress={handlePressMyTasks} />
        <Divider height={12} />
        {myTasks.map((task) => {
          return <TaskItemComponent key={task.id} item={task} />;
        })}
        <Divider height={24} />
        <HomePageMenuItem
          name="Autres tâches"
          onPress={handlePressOtherTasks}
        />
        <Divider height={12} />
        {otherTasks.map((task) => {
          return <TaskItemComponent key={task.id} item={task} />;
        })}
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-12 right-6 justify-center items-center bg-primary w-16 h-16 rounded-full shadow-lg"
        onPress={() => {
          navigation.navigate(Root.AddTaskPage);
        }}
      >
        <Icon
          name="plus"
          type="font-awesome-5"
          color="white"
          size={24}
          solid={false}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;
