import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import { formatDate } from "@app/utils/DateUtils";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import DatePicker from "react-native-modern-datepicker";

const CustomDatePicker = ({
  handleChange,
  displayTopPlaceHolder = false,
  placeHolder,
  defaultValue,
}: {
  handleChange: (date: string) => void;
  displayTopPlaceHolder: boolean;
  placeHolder: string;
  defaultValue?: string;
}) => {
  const [date, setDate] = useState(defaultValue || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const maximumDate = new Date();

  const handleDateChange = (selectedDate: string) => {
    handleChange(selectedDate);
    setDate(selectedDate);
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
          setShowDatePicker(true);
        }}
      >
        <Modal
          animationType="slide"
          transparent
          visible={showDatePicker}
          onRequestClose={() => {
            setShowDatePicker(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View className="flex-1 justify-center items-center">
              <View className="m-5 bg-white rounded-3xl w-[90%] p-9 items-center shadow-[#00000040]">
                <TouchableOpacity
                  className="absolute top-3 right-3"
                  onPress={() => setShowDatePicker(false)}
                >
                  <Icon
                    name="close"
                    type="ionicon"
                    color={Theme.primary}
                    size={30}
                  />
                </TouchableOpacity>
                <DatePicker
                  locale="fr"
                  mode="calendar"
                  onDateChange={handleDateChange}
                  maximumDate={maximumDate.toISOString()}
                  selected={date}
                  options={{
                    textDefaultColor: "black",
                    textHeaderColor: Theme.primary,
                    textSecondaryColor: Theme.primary,
                    mainColor: Theme.primary,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Text
          className={
            "text-sm text-left " + date === "" ? "text-[#929292]" : "text-black"
          }
        >
          {date === "" ? placeHolder : formatDate(date)}
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
