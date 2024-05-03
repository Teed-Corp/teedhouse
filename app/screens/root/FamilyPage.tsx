import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Divider from "@app/components/common/Divider";
import FamilyDetailsPage from "@app/screens/root/FamilyDetailsPage";
import FamilyStatsPage from "@app/screens/root/FamilyStatsPage";
import { Icon } from "react-native-elements";

const FamilyPage = () => {
  const [viewMode, setViewMode] = useState("information");
  const selectedColor = "bg-primary";
  const unselectedColor = "bg-white border border-primary";
  const navButtonClassNames =
    "flex-1 flex-row justify-center items-center py-2";

  return (
    <SafeAreaView className="h-full w-full">
      <Divider height={70} />
      <Text className="text-start mx-5 text-2xl font-bold">
        {viewMode == "information" ? "Informations" : "Statistiques"}
      </Text>
      <View className="flex-row mt-3 justify-center w-full px-5">
        <TouchableOpacity
          onPress={() => setViewMode("information")}
          className={`${navButtonClassNames} rounded-l-xl ${
            viewMode === "information" ? selectedColor : unselectedColor
          }`}
        >
          <Icon
            name={"id-card"}
            type={"font-awesome-5"}
            color={viewMode === "information" ? "white" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode("stats")}
          className={`${navButtonClassNames} rounded-r-xl ${
            viewMode === "stats" ? selectedColor : unselectedColor
          }`}
        >
          <Icon
            name={"chart-bar"}
            type={"font-awesome-5"}
            color={viewMode === "stats" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Divider height={20} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-grow">
        {viewMode === "information" ? (
          <FamilyDetailsPage />
        ) : (
          <FamilyStatsPage />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FamilyPage;
