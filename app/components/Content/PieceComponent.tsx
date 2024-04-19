import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PieceComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.piece}>
        <Ionicons name="star" size={15} color="#FEDA2C" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEDA2C",
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  piece: {
    backgroundColor: "#FCAA17",
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
