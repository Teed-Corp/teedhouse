import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { convertDateToString } from "@app/utils/DateUtils";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
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
  const [dateUpdated, setDateUpdated] = useState(date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const maximumDate = new Date();

  const handleDateChange = ({ type }: any, selectedDate: Date) => {
    if (type === "set") {
      setDate(selectedDate);
      if (Platform.OS === "android") {
        setShowDatePicker(false);
        setDateUpdated(selectedDate);
        handleChange(selectedDate);
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const confirmIosDate = () => {
    setDateUpdated(date);
    handleChange(date);
    setShowDatePicker(false);
  };

  const cancelIosDate = () => {
    setDate(dateUpdated);
    setShowDatePicker(false);
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
          setShowDatePicker(!showDatePicker);
        }}
      >
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
      <Divider height={5} />
      {showDatePicker && (
        <>
          <DateTimePicker
            maximumDate={maximumDate}
            mode="date"
            value={date ?? new Date()}
            display="spinner"
            onChange={handleDateChange}
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
              flexDirection: "column",
            }}
          />
          <Divider height={10} />
          {Platform.OS === "ios" && showDatePicker && (
            <View className="flex-row justify-around">
              <TouchableOpacity
                className="p-4 items-center justify-center bg-white rounded-2xl"
                onPress={cancelIosDate}
              >
                <Text className="text-primary">Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 items-center justify-center bg-primary rounded-2xl"
                onPress={confirmIosDate}
              >
                <Text className="text-white">Valider</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default CustomDatePicker;
