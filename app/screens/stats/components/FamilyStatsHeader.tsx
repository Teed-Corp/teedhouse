import PieceComponent from "@app/components/Content/PieceComponent";
import Divider from "@app/components/Divider";
import theme from "@app/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

const FamilyStatsHeader = ({ totalScore, progess }) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.primary, theme.gradientColor]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.row}>
        <Text style={styles.textRow}>Tâches effectuées</Text>
        <Text style={styles.textRow}>{progess * 100}%</Text>
      </View>
      <Divider height={12} />
      <View style={styles.progressBarContainer}>
        <ProgressBar
          style={styles.progressBar}
          progress={progess}
          visible
          color="white"
        />
      </View>
      <Divider height={16} />
      <View style={styles.totalScoreContainer}>
        <Text style={styles.scoreText}>Score total : </Text>
        <Text style={styles.scoreNumber}>{totalScore}</Text>
        <Divider width={8} />
        <PieceComponent />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    alignItems: "center",
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
    fontSize: 15,
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
  totalScoreContainer: {
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

export default FamilyStatsHeader;
