import theme from "@app/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  View,
} from "react-native";

const CustomTextField = ({
  value,
  onChangeEvent,
  placeHolderValue = "",
  secureTextEntry = false,
  isPassword = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: {
  value: string;
  onChangeEvent: (value: string) => void;
  placeHolderValue: string;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused ? theme.gradientColor : theme.borderColor },
        ]}
        value={value}
        placeholder={placeHolderValue}
        onChangeText={onChangeEvent}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconContainer}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: theme.defaultRadius,
    paddingLeft: 25,
    width: "100%",
  },
  input: {
    fontSize: 15,
    flex: 1,
    height: 56,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
});
