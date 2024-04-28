import PieceComponent from "@app/components/common/Content/PieceComponent";
import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

const HomePageStatsHeader = ({ familyProgess, personalProgress }) => {
  const displayFamilyProgess = familyProgess * 100;
  const displayPersonalProgress = personalProgress * 100;

  return (
    <LinearGradient
      style={styles.container}
      colors={[Theme.primary, Theme.gradientColor]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.row}>
        <Text style={styles.textRow}>
          {displayFamilyProgess}% des tâches de la semaine ont été réalisées
        </Text>
      </View>
      <Divider height={10} />
      <View style={styles.row}>
        <Text style={styles.personalProgress}>
          Vous avez effectué {displayPersonalProgress}% sur{" "}
          {displayFamilyProgess}%
        </Text>
      </View>
      <Divider height={8} />
      <View style={styles.progressBarContainer}>
        <ProgressBar
          style={styles.progressBar}
          progress={familyProgess}
          visible
          color="white"
        />
      </View>
      <Divider height={10} />
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Mon score : </Text>
        <Text style={styles.scoreNumber}>100</Text>
        <Divider width={8} />
        <PieceComponent />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRow: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  personalProgress: {
    color: "white",
    fontSize: 14,
  },
  progressBar: {
    backgroundColor: "rgba(232, 237, 233, 0.1)",
    height: "100%",
    borderRadius: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
  },
  scoreContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(232, 237, 233, 0.1)",
    padding: 10,
  },
  scoreText: {
    color: "white",
    fontSize: 16,
  },
  scoreNumber: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomePageStatsHeader;
