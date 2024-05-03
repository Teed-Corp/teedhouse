import PieceComponent from "@app/components/common/Content/PieceComponent";
import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import ProfileCard from "@app/components/common/Content/ProfileCard";

const FamilyStatsPage = () => {
  const data = [
    { name: "John", score: 100, profilePicture: "https://picsum.photos/200" },
    { name: "Jane", score: 50, profilePicture: null },
    { name: "Doe", score: 50, profilePicture: "https://picsum.photos/200" },
    { name: "Smith", score: 0, profilePicture: null },
    { name: "Doe", score: 304, profilePicture: "https://picsum.photos/200" },
    { name: "Smith", score: 34, profilePicture: null },
    { name: "Doe", score: 22, profilePicture: "https://picsum.photos/200" },
    { name: "Doe", score: 22, profilePicture: "https://picsum.photos/200" },
    { name: "Doe", score: 22, profilePicture: "https://picsum.photos/200" },
    { name: "Doe", score: 22, profilePicture: "https://picsum.photos/200" },
  ];

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
          <Text className="text-white text-xl font-bold">500</Text>
          <Divider width={8} />
          <PieceComponent />
        </View>
      </LinearGradient>
      <Divider height={24} />
      {data.map((member, index) => (
        <React.Fragment key={member.name + index}>
          <ProfileCard user={member} />
          <Divider height={12} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default FamilyStatsPage;
