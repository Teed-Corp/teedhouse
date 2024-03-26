import colors from "@app/utils/theme";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const CustomTextField = ({
  value,
  onChangeEvent,
  placeHolderValue,
  ...props
}: {
  value: string;
  onChangeEvent: (value: string) => void;
  placeHolderValue: string;
  props?: any;
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeHolderValue}
        onChangeText={onChangeEvent}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    height: 56,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 25,
    width: "100%",
    marginBottom: 20,
  },
});
