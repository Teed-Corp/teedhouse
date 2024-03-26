import theme from "@app/theme/theme";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const CustomTextField = ({
  value,
  onChangeEvent,
  placeHolderValue = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: {
  value: string;
  onChangeEvent: (value: string) => void;
  placeHolderValue: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? theme.gradientColor : theme.borderColor },
        ]}
        value={value}
        placeholder={placeHolderValue}
        onChangeText={onChangeEvent}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    height: 56,
    borderWidth: 0.5,
    borderRadius: theme.defaultRadius,
    paddingLeft: 25,
    width: "100%",
    marginBottom: 20,
  },
});
