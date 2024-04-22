import CustomDropdown from "@app/components/Inputs/CustomDropdown";
import theme from "@app/theme/theme";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function CustomRepeat() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) setSelectedDays([]);
  };

  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = [
    { label: "Lundi", value: "Lundi" },
    { label: "Mardi", value: "Mardi" },
    { label: "Mercredi", value: "Mercredi" },
    { label: "Jeudi", value: "Jeudi" },
    { label: "Vendredi", value: "Vendredi" },
    { label: "Samedi", value: "Samedi" },
    { label: "Dimanche", value: "Dimanche" },
  ];

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
        <CustomDropdown
          onSelect={setSelectedDays}
          displayTopPlaceHolder
          placeHolder="Jours à répéter"
          zindex={1}
          data={daysOfWeek}
          values={selectedDays}
        />
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
  text: {
    padding: 5,
  },
});
