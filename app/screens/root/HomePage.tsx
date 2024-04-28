import Divider from "@app/components/common/Divider";
import HomePageHeader from "@app/components/root/home/HomePageHeader";
import HomePageMenuItem from "@app/components/root/home/HomePageMenuItem";
import HomePageStatsHeader from "@app/components/root/home/HomePageStatsHeader";
import TaskItemComponent from "@app/components/root/task/TaskItemComponent";
import { useFamily } from "@app/context/FamilyContext";
import { useProfile } from "@app/context/ProfileContext";
import { Root } from "@app/navigation/routes";
import Theme from "@app/theme/Theme";
import { completed_task, profile } from "@prisma/client";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const navigation: any = useNavigation();
  const { getProfile } = useProfile();
  const { getCompletedTasks, getUserCompletedTasks } = useFamily();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<profile>(null);
  const [myTasks, setMyTasks] = useState<completed_task[]>([]);
  const [otherTasks, setOtherTasks] = useState<completed_task[]>([]);

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
      setIsLoading(false);
    };

    fetch().catch(console.error);
  }, []);

  if (isLoading) return null;

  return (
    <SafeAreaView style={styles.container}>
      <HomePageHeader user={profile} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Divider height={20} />
        <HomePageStatsHeader familyProgess={0.5} personalProgress={0.23} />
        <Divider height={24} />
        <HomePageMenuItem name="Mes tâches" onPress={handlePressMyTasks} />
        <Divider height={12} />
        {myTasks &&
          myTasks.map((task) => {
            return <TaskItemComponent key={task.id} item={task} />;
          })}
        <Divider height={24} />
        <HomePageMenuItem
          name="Autres tâches"
          onPress={handlePressOtherTasks}
        />
        <Divider height={12} />
        {otherTasks &&
          otherTasks.map((task) => {
            return <TaskItemComponent key={task.id} item={task} />;
          })}
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          console.log("Add task");
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
  },
});

export default HomePage;
