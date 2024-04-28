import React from "react";
import { View } from "react-native";

const Divider = ({
  width = 0,
  height = 0,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
};

export default Divider;
