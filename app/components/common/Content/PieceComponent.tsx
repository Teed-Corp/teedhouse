import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function PieceComponent() {
  return (
    <View className="bg-[#FEDA2C] rounded-full w-7 h-7 items-center justify-center">
      <View className="bg-[#FCAA17] rounded-full w-5 h-5 items-center justify-center">
        <Ionicons name="star" size={14} color="#FEDA2C" />
      </View>
    </View>
  );
}
