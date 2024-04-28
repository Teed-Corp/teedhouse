import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

export default function PieceComponent() {
  return (
    <View className="bg-[#FEDA2C] rounded-full w-8 h-8 items-center justify-center">
      <View className="bg-[#FCAA17] rounded-full w-8 h-8 items-center justify-center">
        <Ionicons name="star" size={15} color="#FEDA2C" />
      </View>
    </View>
  );
}
