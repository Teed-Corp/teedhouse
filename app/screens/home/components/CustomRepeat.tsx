import ErrorText from "@app/components/Content/ErrorText";
import Divider from "@app/components/Divider";
import theme from "@app/theme/theme";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function CustomRepeat({ onSelectDays, isDisplayError }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedSlideBar, setSelectedSlideBar] = useState("Jours");
  const [selectedValues, setSelectedValues] = useState([]);
  const values = ["Jours", "Mois", "Années"];

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) setSelectedSlideBar("Jours");
  };

  const handleSlideBarSelection = (value: string) => {
    setSelectedSlideBar(value);
    setSelectedValues([]);
  };

  const handleButtonPress = (value: string) => {
    const index = selectedValues.indexOf(value);
    let updatedValues = [];
    if (index === -1) {
      updatedValues = [...selectedValues, value];
    } else {
      updatedValues = selectedValues.filter((val) => val !== value);
    }
    setSelectedValues(updatedValues);
    onSelectDays(updatedValues);
  };

  const daysOfWeek = [
    { label: "L", value: "Lundi" },
    { label: "M", value: "Mardi" },
    { label: "M", value: "Mercredi" },
    { label: "J", value: "Jeudi" },
    { label: "V", value: "Vendredi" },
    { label: "S", value: "Samedi" },
    { label: "D", value: "Dimanche" },
  ];

  const eachMonth = [
    { label: "1", value: "1Month" },
    { label: "2", value: "2Months" },
    { label: "3", value: "3Months" },
    { label: "4", value: "4Months" },
    { label: "5", value: "5Months" },
    { label: "6", value: "6Months" },
    { label: "7", value: "7Months" },
  ];

  const eachYears = [
    { label: "1", value: "1Years" },
    { label: "2", value: "2Years" },
    { label: "3", value: "3Years" },
    { label: "4", value: "4Years" },
    { label: "5", value: "5Years" },
    { label: "6", value: "6Years" },
    { label: "7", value: "7Years" },
  ];

  let buttons = [];
  if (selectedSlideBar === "Jours") {
    buttons = daysOfWeek;
  } else if (selectedSlideBar === "Mois") {
    buttons = eachMonth;
  } else if (selectedSlideBar === "Années") {
    buttons = eachYears;
  }

  return (
    <View>
      <View style={styles.switch}>
        <Text style={styles.text}>Répéter</Text>
        <Switch
          trackColor={{ false: "#767577", true: theme.gradientColor }}
          thumbColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {isEnabled && (
        <View>
          <View style={styles.sliderBar}>
            {values.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.item,
                  value === selectedSlideBar
                    ? styles.selectedItem
                    : styles.notSelectedItem,
                ]}
                onPress={() => handleSlideBarSelection(value)}
              >
                <Text
                  style={[
                    styles.itemText,
                    value === selectedSlideBar
                      ? styles.selectedItemText
                      : styles.notSelectedItemText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Divider height={20} />
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  selectedValues.includes(button.value)
                    ? styles.selectedItem
                    : null,
                ]}
                onPress={() => handleButtonPress(button.value)}
              >
                <Text
                  style={
                    selectedValues.includes(button.value)
                      ? styles.selectedItemText
                      : null
                  }
                >
                  {button.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedValues.length === 0 && isDisplayError && isEnabled && (
            <ErrorText error="Veuillez selectionner au moin un élément" />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderBar: {
    flexDirection: "row",
    backgroundColor: theme.bgColor,
    borderRadius: 25,
  },
  selectedItem: {
    backgroundColor: theme.gradientColor,
  },
  notSelectedItem: {
    backgroundColor: theme.bgColor,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,

    paddingVertical: 10,
    borderRadius: 25,
  },
  selectedItemText: {
    color: "white",
  },
  notSelectedItemText: {
    color: "#000",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
});
