import colors from "@app/theme/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const FamilyButton = ({ onPressEvent, isJoinFamily, title }) => {
  return (
    <TouchableOpacity style={styles.cardShadow} onPress={onPressEvent}>
      <View style={[styles.cardContainer]}>
        {!isJoinFamily ? (
          <LinearGradient
            colors={[colors.primary, colors.gradientColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.content}
          >
            <Text style={styles.text}>{title}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.content}>
            <Text style={styles.joinFamily}>{title}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FamilyButton;

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  joinFamily: {
    fontSize: 20,
    color: colors.primary,
  },

  cardShadow: {
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
    height: "35%",
  },
  cardContainer: {
    borderRadius: 25,
    overflow: "hidden",
    height: "100%",
  },
});
