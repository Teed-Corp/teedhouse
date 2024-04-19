import TaskItemComponent from "@app/screens/task/components/TaskItemComponent";
import TitleComponent from "@app/screens/task/components/TitleComponent";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskPage({
  title,
  taskList,
}: {
  title: string;
  taskList: any[];
}) {
  title = "Mes Tâches";
  //title = "Autres Tâches"

  taskList = [
    {
      taskName: "Task 1",
      name: "Item 1",
      score: 80,
      type: "car",
    },
    {
      taskName: "Task 2",
      name: "Item 2",
      score: 65,
      type: "menage",
    },
    {
      taskName: "Task 3",
      name: "Item 3",
      score: 90,
      type: "shopping",
    },
    {
      taskName: "Task 1",
      name: "Item 1",
      score: 80,
      type: "car",
    },
    {
      taskName: "Task 2",
      name: "Item 2",
      score: 65,
      type: "menage",
    },
    {
      taskName: "Task 3",
      name: "Item 3",
      score: 90,
      type: "shopping",
    },
    {
      taskName: "Task 1",
      name: "Item 1",
      score: 80,
      type: "car",
    },
    {
      taskName: "Task 2",
      name: "Item 2",
      score: 65,
      type: "menage",
    },
    {
      taskName: "Task 3",
      name: "Item 3",
      score: 90,
      type: "shopping",
    },
    {
      taskName: "Task 1",
      name: "Item 1",
      score: 80,
      type: "car",
    },
    {
      taskName: "test 2",
      name: "Item 2",
      score: 65,
      type: "menage",
    },
    {
      taskName: "Task 3",
      name: "Item 3",
      score: 90,
      type: "shopping",
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <TitleComponent title={title} />
        </View>
        {taskList.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.text}>Vous n'avez pas de tache en cours</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {taskList.map((item, index) => (
              <TaskItemComponent key={index} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  center: {
    paddingTop: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
