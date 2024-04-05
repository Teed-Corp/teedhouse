import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  data: string[];
  selected: string | null;
  onSelect: (item: string) => void;
}

const SelectableList = () => {
  return <View></View>;
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
});

export default SelectableList;
