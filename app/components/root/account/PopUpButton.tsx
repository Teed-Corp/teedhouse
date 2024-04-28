import colors from "@app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PopUpButton = ({ title, onPressEvent }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          title === "Caméra" ? onPressEvent(false) : onPressEvent(true);
        }}
        style={styles.button}
      >
        <LinearGradient
          colors={[colors.primary, colors.gradientColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {title === "Caméra" ? (
            <Ionicons name="camera" size={20} color="white" />
          ) : (
            <Ionicons name="image" size={20} color="white" />
          )}
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PopUpButton;

const styles = StyleSheet.create({
  container: {
    width: "70%",
  },
  gradient: {
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingVertical: 20,
  },
  button: {
    width: "100%",
    height: 70,
    overflow: "hidden",
  },
  text: {
    paddingTop: 5,
    color: "white",
    fontSize: 20,
  },
});
