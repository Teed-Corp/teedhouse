import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const HomePageMenuItem = ({
  name,
  onPress,
}: {
  name: string;
  onPress?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-full p-4 bg-[#E6EAFF] rounded-xl flex flex-row justify-between items-center">
        <Text className="text-lg font-bold">{name}</Text>
        <Icon name="chevron-right" type="font-awesome" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default HomePageMenuItem;
