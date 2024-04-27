import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import theme from "@app/theme/theme";

const HeaderIcon = ({ icon, size }: { icon: string; size?: number }) => {
  return (
    <View style={styles.circle}>
      <Icon
        name={icon}
        type="font-awesome"
        color={theme.third}
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
