import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function CarIcon() {
  return (
    <View style={styles.container}>
      <Ionicons name="car" style={styles.car} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(33, 33, 33, 0.05)",
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  car: {
    fontSize: 40,
    height: 50,
    width: 50,
    padding: 5,
    color: "#C84217",
    alignItems: "center",
    justifyContent: "center",
  },
});
