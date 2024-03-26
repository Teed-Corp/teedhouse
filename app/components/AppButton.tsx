import colors from "@app/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppButton = ({ title, onPressEvent }) => {
  return (
    <View>
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
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 25,
    height: 56,
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
