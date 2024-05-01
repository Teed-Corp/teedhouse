import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { convertDateToString } from "@app/utils/DateUtils";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const CustomDatePicker = ({
  handleChange,
  displayTopPlaceHolder = false,
  placeHolder,
  defaultValue,
}: {
  handleChange: (date: Date) => void;
  displayTopPlaceHolder: boolean;
  placeHolder: string;
  defaultValue?: Date;
}) => {
  const [date, setDate] = useState(defaultValue ?? null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const maximumDate = new Date();

  const handleDateChange = ({ type }: any, selectedDate: Date) => {
    setShowDatePicker(false);
    if (type === "set") {
      setDate(selectedDate);
      handleChange(selectedDate);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <View className="w-full">
      {displayTopPlaceHolder && (
        <>
          <Text className="ml-1">{placeHolder}</Text>
          <Divider height={12} />
        </>
      )}
      <TouchableOpacity
        className="w-full flex flex-row justify-between items-center border rounded-3xl px-6 h-14 bg-white"
        onPress={() => {
          setShowDatePicker(true);
        }}
      >
        {showDatePicker && (
          <DateTimePicker
            maximumDate={maximumDate}
            mode="date"
            value={date ?? new Date()}
            display="spinner"
            onChange={handleDateChange}
          />
        )}
        <Text
          style={{ color: date == null ? "#929292" : "black" }}
          className="text-sm text-left"
        >
          {!date ? placeHolder : convertDateToString(date)}
        </Text>
        <Icon
          name="calendar"
          type="font-awesome"
          color={Theme.primary}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDatePicker;
