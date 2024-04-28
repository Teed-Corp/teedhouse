import colors from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppButton = ({ title, onPressEvent }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressEvent} style={styles.button}>
        <LinearGradient
          colors={[colors.primary, colors.gradientColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  gradient: {
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
  },
  button: {
    width: "100%",
    height: 56,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
