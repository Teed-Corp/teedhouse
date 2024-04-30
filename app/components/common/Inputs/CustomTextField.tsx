import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
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
  displayTopPlaceHolder = false,
  editable = true,
}: {
  value: string;
  onChangeEvent: (value: string) => void;
  placeHolderValue: string;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  displayTopPlaceHolder?: boolean;
  editable?: boolean;
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
    <View>
      {displayTopPlaceHolder && (
        <>
          <Text className="ml-1">{placeHolderValue}</Text>
          <Divider height={12} />
        </>
      )}
      <View className="flex flex-row items-center border rounded-3xl pl-6 w-full h-12 bg-white">
        <TextInput
          className="text-sm flex-1 h-14"
          value={value}
          placeholder={placeHolderValue}
          placeholderTextColor="#929292"
          onChangeText={onChangeEvent}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          editable={editable}
          onBlur={handleBlur}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={toggleShowPassword}
            className="absolute right-3"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={Theme.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextField;
