import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomePageHeader from "@app/screens/home/components/HomePageHeader";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Divider from "@app/components/Divider";
import HomePageMenuItem from "@app/screens/home/components/HomePageMenuItem";
import TaskItemComponent from "@app/screens/task/components/TaskItemComponent";
import theme from "@app/theme/theme";
import { Icon } from "react-native-elements";
import HomePageStatsHeader from "@app/screens/home/components/HomePageStatsHeader";

const HomePage = () => {
  const user = {
    name: "John Doe",
    profilePicture: "https://picsum.photos/200",
  };
  const myTasks = [
    {
      taskName: "Laver la voiture",
      name: "Antho",
      score: 145,
      type: "car",
    },
    {
      taskName: "Faire les courses",
      name: "Antho",
      score: 200,
      type: "shopping",
    },
    {
      taskName: "Faire le ménage",
      name: "Antho",
      score: 100,
      type: "household",
    },
  ];

  const otherTasks = [
    {
      taskName: "Sortir le chien",
      name: "Lucas",
      score: 145,
      type: "dog",
    },
    {
      taskName: "Faire la vaisselle",
      name: "Logan",
      score: 200,
      type: "dish",
    },
    {
      taskName: "Faire le lit",
      name: "Mathis",
      score: 100,
      type: "bed",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HomePageHeader user={user} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Divider height={20} />
        <HomePageStatsHeader familyProgess={0.5} personalProgress={0.23} />
        <Divider height={24} />
        <HomePageMenuItem
          name={"Mes tâches"}
          onPress={() => {
            console.log("Mes tâches");
          }}
        />
        <Divider height={12} />
        {myTasks.map((task) => {
          return <TaskItemComponent item={task} />;
        })}
        <Divider height={24} />
        <HomePageMenuItem
          name={"Autres tâches"}
          onPress={() => {
            console.log("Autres tâches");
          }}
        />
        <Divider height={12} />
        {otherTasks.map((task) => {
          return <TaskItemComponent item={task} />;
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
    backgroundColor: theme.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
  },
});

export default HomePage;
