import Theme from "@app/theme/Theme";
import React from "react";
import { Text } from "react-native";

const ErrorText = ({ error }: { error: string }) => {
  // @ts-ignore
  return <Text style={Theme.styles.errorText}>{error}</Text>;
};

export default ErrorText;
