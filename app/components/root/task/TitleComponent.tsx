import Theme from "@app/theme/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TitleComponent({ title }: { title: string }) {
  const textLength = title.length;
  const containerWidth = textLength * 10 + 100;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.gradientColor,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleText: {
    color: "#ffffff",
    fontSize: 25,
  },
});
