import Divider from "@app/components/common/Divider";
import TaskItemComponent from "@app/components/root/task/TaskItemComponent";
import { completed_task } from "@prisma/client";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskPage({
  route,
}: {
  route: Readonly<RouteProp<any>>;
}) {
  const { taskList } = route.params;

  return (
    <SafeAreaView>
      <View className="h-full w-full pt-5 px-5">
        <Divider height={100} />
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
            className="flex-grow pt-5"
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {taskList.map((item: completed_task) => (
              <TaskItemComponent key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
