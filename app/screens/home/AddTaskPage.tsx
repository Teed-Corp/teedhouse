import AppButton from "@app/components/Inputs/AppButton";
import CustomDatePicker from "@app/components/Inputs/CustomDatePicker";
import CustomDropdown from "@app/components/Inputs/CustomDropdown";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import CustomRepeat from "@app/screens/home/components/CustomRepeat";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTaskPage() {
  const [taskType, setTypeTask] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [person, setPerson] = useState(null);

  const data = [
    { label: "Ménagère", value: "menage" },
    { label: "Voiture", value: "car" },
    { label: "Course", value: "shopping" },
  ];

  const familyData = [
    { label: "Anthony", value: "Anthony" },
    { label: "Mathis", value: "Mathis" },
    { label: "Corentin", value: "Corentin" },
  ];

  const onConfirm = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          taskType: "",
          taskName: "",
          person: "",
          startingDate: "",
        }}
        onSubmit={() => {
          console.log("test");
        }}
      >
        {({ values, touched, handleChange, handleSubmit, errors }) => (
          <View style={styles.cardShadow}>
            <View style={styles.card}>
              <CustomDropdown
                data={data}
                onSelect={setTypeTask}
                value={taskType}
                placeHolder="Type de tâche"
                displayTopPlaceHolder
                zindex={3}
              />
              <CustomTextField
                value={taskName}
                onChangeEvent={setTaskName}
                placeHolderValue="Nom de la tâche"
                displayTopPlaceHolder
              />
              <CustomDropdown
                data={familyData}
                onSelect={setPerson}
                value={person}
                placeHolder="Personne qui doit effectuer la tâche"
                displayTopPlaceHolder
                zindex={2}
              />
              <CustomDatePicker
                handleChange={handleChange("startingDate")}
                displayTopPlaceHolder
                placeHolder="Date de début"
              />
              <CustomRepeat />
              <View style={styles.button}>
                <AppButton title="Créer la tâche" onPressEvent={onConfirm} />
              </View>
            </View>
          </View>
        )}
      </Formik>
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
