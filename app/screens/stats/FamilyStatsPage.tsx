import Divider from "@app/components/Divider";
import FamilyStatsHeader from "@app/screens/stats/components/FamilyStatsHeader";
import FamilyStatsList from "@app/screens/stats/components/FamilyStatsList";
import React from "react";
import { StyleSheet } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <Divider height={60} />
      <FamilyStatsHeader progess={0.65} totalScore={200} />
      <Divider height={24} />
      <FamilyStatsList users={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default FamilyStatsPage;
