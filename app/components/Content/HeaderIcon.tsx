import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import theme from "@app/theme/theme";

const HeaderIcon = ({ icon }: { icon: string }) => {
  return (
    <View style={styles.circle}>
      <Icon name={icon} type="font-awesome" color={theme.third} size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default HeaderIcon;
