import Theme from "@app/theme/Theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

const HeaderIcon = ({ icon, size }: { icon: string; size?: number }) => {
  return (
    <View style={styles.circle}>
      <Icon
        name={icon}
        type="font-awesome"
        color={Theme.third}
        size={size ?? 40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 12,
  },
});

export default HeaderIcon;
