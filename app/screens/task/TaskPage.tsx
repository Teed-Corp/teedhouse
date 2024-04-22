import Divider from "@app/components/Divider";
import TaskItemComponent from "@app/screens/task/components/TaskItemComponent";
import TitleComponent from "@app/screens/task/components/TitleComponent";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskPage({ route }: { route: RouteProp<any> }) {
  const { title, taskList } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Divider height={35} />
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
    width: "100%",
    paddingHorizontal: 20,
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
