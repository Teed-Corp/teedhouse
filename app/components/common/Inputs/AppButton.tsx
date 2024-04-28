import colors from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AppButton = ({ title, onPressEvent }) => {
  return (
    <View className="w-full">
      <TouchableOpacity
        onPress={onPressEvent}
        className="w-full h-14 overflow-hidden"
      >
        <LinearGradient
          colors={[colors.primary, colors.gradientColor]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          className="w-full rounded-3xl justify-center items-center h-14"
        >
          <Text className="text-white text-xl">{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;
