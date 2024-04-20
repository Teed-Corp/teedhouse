import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      <View style={styles.container}>
        <Text style={styles.label}>{name}</Text>
        <Icon name={"chevron-right"} type={"font-awesome"} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 14,
    backgroundColor: "#E6EAFF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomePageMenuItem;
