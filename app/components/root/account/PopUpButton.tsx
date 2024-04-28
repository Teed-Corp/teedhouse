import colors from "@app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PopUpButton = ({ title, onPressEvent }) => {
  return (
    <View className="w-[70%]">
      <TouchableOpacity
        onPress={() => {
          title === "Caméra" ? onPressEvent(false) : onPressEvent(true);
        }}
        className="w-full h-20 overflow-hidden"
      >
        <LinearGradient
          colors={[colors.primary, colors.gradientColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          className="w-full rounded-3xl justify-center items-center h-full p-5"
        >
          {title === "Caméra" ? (
            <Ionicons name="camera" size={20} color="white" />
          ) : (
            <Ionicons name="image" size={20} color="white" />
          )}
          <Text className="pt-1 text-white text-xl">{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PopUpButton;
