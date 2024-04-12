import React from "react";
import { ActivityIndicator } from "react-native";
import theme from "@app/theme/theme";

const CustomLoader = () => {
  return <ActivityIndicator size="large" color={theme.primary} />;
};

export default CustomLoader;
