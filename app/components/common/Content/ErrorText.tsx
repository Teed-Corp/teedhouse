import React from "react";
import { Text } from "react-native";

const ErrorText = ({ error }: { error: string }) => {
  // color: "red",
  //       marginTop: 5,
  //       marginLeft: 4,
  //       width: "100%",
  // @ts-ignore
  return <Text className="mt-1 ml-1 w-full">{error}</Text>;
};

export default ErrorText;
