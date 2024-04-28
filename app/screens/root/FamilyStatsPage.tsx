import PieceComponent from "@app/components/common/Content/PieceComponent";
import ProfilePicture from "@app/components/common/Content/ProfilePicture";
import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="w-full h-full px-5">
      <Divider height={60} />
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
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <View className="w-full px-5 flex flex-row justify-between bg-white p-3 rounded-xl">
              <View className="flex flex-row items-center">
                <View className="w-14 h-14 rounded-xl bg-[#2121211a] mr-3 justify-center">
                  <ProfilePicture
                    uri={item.profilePicture}
                    imageStyle="w-full h-full rounded-xl"
                    iconSize={30}
                  />
                </View>
                <Text>{item.name}</Text>
              </View>
              <View className="flex flex-row justify-center items-center">
                <PieceComponent />
                <Text className="text-lg font-bold ml-2">{item.score}</Text>
              </View>
            </View>
            <Divider height={12} />
          </>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        className="w-full"
      />
    </SafeAreaView>
  );
};

export default FamilyStatsPage;
