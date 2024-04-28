import Theme from "@app/theme/Theme";
import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";

const HeaderIcon = ({ icon, size }: { icon: string; size?: number }) => {
  return (
    <View className="rounded-full bg-white justify-center p-3">
      <Icon
        name={icon}
        type="font-awesome"
        color={Theme.third}
        size={size ?? 40}
      />
    </View>
  );
};

export default HeaderIcon;
