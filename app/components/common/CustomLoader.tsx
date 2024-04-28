import Theme from "@app/theme/Theme";
import React from "react";
import { ActivityIndicator } from "react-native";

const CustomLoader = () => {
  return <ActivityIndicator size="large" color={Theme.primary} />;
};

export default CustomLoader;
