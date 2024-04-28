import colors from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FamilyButton = ({ onPressEvent, isJoinFamily, title }) => {
  return (
    <TouchableOpacity
      className="rounded-3xl bg-transparent shadow-[##00000099] h-[35%]"
      onPress={onPressEvent}
    >
      <View className="rounded-3xl overflow-hidden h-full">
        {!isJoinFamily ? (
          <LinearGradient
            colors={[colors.primary, colors.gradientColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            className="items-center justify-center flex-1 bg-white"
          >
            <Text className="text-xl text-white">{title}</Text>
          </LinearGradient>
        ) : (
          <View className="items-center justify-center flex-1 bg-white">
            <Text className="text-xl text-primary">{title}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FamilyButton;
