import ErrorText from "@app/components/Content/ErrorText";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDatePicker from "@app/components/Inputs/CustomDatePicker";
import CustomRepeat from "@app/screens/home/components/CustomRepeat";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InformationTaskPage({ route }) {
  const { taskName, taskType, person, points } = route.params;

  const [date, setDate] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

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
          <CustomRepeat
            onSelectDays={onSelectDays}
            isDisplayError={displayError}
          />
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
});
