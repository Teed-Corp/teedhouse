import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "@app/theme/theme";
import Divider from "@app/components/Divider";
import { Icon } from "react-native-elements";

const CustomDropdown = ({
  data,
  onSelect,
  placeHolder,
  displayTopPlaceHolder = false,
  value,
}: {
  data: string[];
  onSelect: (item: string) => void;
  placeHolder: string;
  displayTopPlaceHolder?: boolean;
  value?: string;
}) => {
  const handlePress = () => {};

  return (
    <View style={styles.container}>
      {displayTopPlaceHolder && (
        <>
          <Text style={styles.topPlaceHolder}>{placeHolder}</Text>
          <Divider height={12} />
        </>
      )}
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>
            {value === null ? placeHolder : value}
          </Text>
          <Icon
            name={"caret-down"}
            type="font-awesome"
            color={"#AAAAAA"}
            size={30}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: theme.defaultRadius,
    paddingLeft: 25,
    width: "100%",
    height: 56,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  placeholder: {
    fontSize: 15,
    color: "#929292",
    textAlign: "left",
  },
  topPlaceHolder: {
    marginLeft: 4,
  },
  icon: {
    marginRight: 15,
  },
});

export default CustomDropdown;
