import CarIcon from "@app/components/Content/CarIcon";
import HouseHoldIcon from "@app/components/Content/HouseHoldIcon";
import PieceComponent from "@app/components/Content/PieceComponent";
import ShoppingIcon from "@app/components/Content/ShoppingIcon";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ListItem {
  taskName: string;
  name: string;
  score: number;
  type: string;
}

export default function TaskItemComponent({ item }: { item: ListItem }) {
  return (
    <View style={styles.container}>
      {item.type === "car" ? (
        <CarIcon />
      ) : item.type === "shopping" ? (
        <ShoppingIcon />
      ) : (
        <HouseHoldIcon />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.taskName}>{item.taskName}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.piece}>
          <PieceComponent />
        </View>
        <View style={styles.scoreWrapper}>
          <Text style={styles.score}>{item.score}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    width: "80%",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  image: {
    backgroundColor: "#212121",
    opacity: 0.05,
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  piece: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
});
