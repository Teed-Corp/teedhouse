import Divider from "@app/components/common/Divider";
import TaskItemComponent from "@app/components/root/task/TaskItemComponent";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskPage({ route }: { route: RouteProp<any> }) {
  const { title, taskList } = route.params;

  return (
    <SafeAreaView>
      <View className="h-full w-full pt-5 px-5">
        <Divider height={35} />
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <View
            className="flex items-center justify-center bg-gradient from-blue-400 to-blue-500 rounded-full px-5 py-4"
            style={{ width: title.length * 10 + 100 }}
          >
            <Text className="text-white text-2xl">{title}</Text>
          </View>
        </View>
        {taskList.length === 0 ? (
          //   center: {
          //     paddingTop: "75%",
          //     justifyContent: "center",
          //     alignItems: "center",
          //   },
          <View className="flex justify-center items-center">
            <Text className="text-xl">Vous n'avez pas de tache en cours</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-grow pt-5 items-center"
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
