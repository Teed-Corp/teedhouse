import theme from "@app/theme/theme";
import React from "react";
import { Text } from "react-native";

const ErrorText = ({ error }: { error: string }) => {
  // @ts-ignore
  return <Text style={theme.styles.errorText}>{error}</Text>;
};

export default ErrorText;