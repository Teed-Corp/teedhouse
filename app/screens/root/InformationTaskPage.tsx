import ErrorText from "@app/components/common/Content/ErrorText";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDatePicker from "@app/components/common/Inputs/CustomDatePicker";
import theme from "@app/theme/Theme";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InformationTaskPage({ route }) {
  const { taskName, taskType, person, points } = route.params;

  const [date, setDate] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
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

  const onSelectDays = (days) => {
    setSelectedDays(days);
  };

  const onConfirm = async () => {
    setDisplayError(true);
    if (
      taskType !== null &&
      taskName !== null &&
      person !== null &&
      points !== null &&
      date !== null
    ) {
    }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <CustomDatePicker
            handleChange={setDate}
            displayTopPlaceHolder
            placeHolder="Date de début"
          />
          {date === null && displayError && (
            <ErrorText error="Une date est requise pour la tâche" />
          )}
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
                        styles.buttonT,
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
                {selectedValues.length === 0 && displayError && isEnabled && (
                  <ErrorText error="Veuillez selectionner au moin un élément" />
                )}
              </View>
            )}
          </View>
          <Divider height={20} />
          <View style={styles.button}>
            <AppButton
              title="Créer la tâche"
              onPressEvent={() => {
                onConfirm();
                console.log(
                  taskName,
                  taskType,
                  person,
                  date,
                  points,
                  selectedDays,
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
  },
  cardShadow: {
    borderRadius: 25,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
  },
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
  buttonT: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
});
