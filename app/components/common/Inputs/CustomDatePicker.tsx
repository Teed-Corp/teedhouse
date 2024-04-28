import Divider from "@app/components/common/Divider";
import Theme from "@app/theme/Theme";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
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
}: {
  handleChange: any;
  displayTopPlaceHolder: boolean;
  placeHolder: string;
}) => {
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const maximumDate = new Date();

  const handleDateChange = (selectedDate: string) => {
    handleChange(selectedDate);
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      {displayTopPlaceHolder && (
        <>
          <Text style={styles.topPlaceHolder}>{placeHolder}</Text>
          <Divider height={12} />
        </>
      )}
      <TouchableOpacity
        style={styles.inputContainer}
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeIcon}
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
        <Text style={date == "" ? styles.placeholder : styles.valueStyle}>
          {date == "" ? placeHolder : formatDate(date)}
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: Theme.defaultRadius,
    paddingHorizontal: 25,
    height: 56,
    backgroundColor: "white",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeholder: {
    fontSize: 15,
    color: "#929292",
    textAlign: "left",
  },
  valueStyle: {
    fontSize: 15,
    color: "black",
    textAlign: "left",
  },
  topPlaceHolder: {
    marginLeft: 4,
  },
});

export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("/");
  const formattedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  );
  const formattedDay = String(formattedDate.getDate()).padStart(2, "0");
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const formattedYear = formattedDate.getFullYear();
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};
export default CustomDatePicker;
