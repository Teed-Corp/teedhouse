import colors from "@app/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GroupButton = ({ onPressEvent, isJoinGroup, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressEvent}
        style={[styles.button, styles.shadowBox]}
      >
        {!isJoinGroup ? (
          <LinearGradient
            colors={[colors.primary, colors.gradientColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.text}>{title}</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.gradient, styles.bg]}>
            <Text style={[styles.text, !isJoinGroup ? null : styles.joinGroup]}>
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GroupButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 25,
    height: 300,
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  joinGroup: {
    color: colors.primary,
  },
  bg: {
    backgroundColor: colors.bgColor,
  },
  shadowBox: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
});
