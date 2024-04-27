import ErrorText from "@app/components/Content/ErrorText";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDropdown from "@app/components/Inputs/CustomDropdown";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import { Home } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTaskPage() {
  const [taskType, setTaskType] = useState(null);
  const [person, setPreson] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [points, setPoints] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  const navigation: any = useNavigation();
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

  const onConfirm = async () => {
    setDisplayError(true);
    if (
      taskType !== null &&
      taskName !== null &&
      person !== null &&
      points !== null
    ) {
      navigation.navigate(Home.InformationTaskPage, {
        taskName: taskName,
        taskType: taskType,
        person: person,
        points: points,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <CustomDropdown
            data={data}
            onSelect={setTaskType}
            value={taskType}
            placeHolder="Type de tâche"
            displayTopPlaceHolder
            zindex={3}
          />
          {taskType === null && displayError && (
            <ErrorText error="Le type de tâche est requis" />
          )}
          <Divider height={20} />
          <CustomTextField
            value={taskName}
            onChangeEvent={setTaskName}
            placeHolderValue="Nom de la tâche"
            displayTopPlaceHolder
          />
          {(taskName === null || taskName === "") && displayError && (
            <ErrorText error="Un nom de tâche est requis" />
          )}
          <Divider height={20} />
          <CustomDropdown
            data={familyData}
            onSelect={setPreson}
            value={person}
            placeHolder="Personne qui doit effectuer la tâche"
            displayTopPlaceHolder
            zindex={2}
          />
          {person === null && displayError && (
            <ErrorText error="Une personne est requise pour la tâche" />
          )}
          <Divider height={20} />
          <CustomTextField
            value={points}
            onChangeEvent={setPoints}
            keyboardType="numeric"
            placeHolderValue="Nombre de points à gagner"
            displayTopPlaceHolder
          />
          {points === null && displayError && (
            <ErrorText error="Un nombre de point est requis" />
          )}

          <Divider height={20} />
          <View style={styles.button}>
            <AppButton
              title="Suivant"
              onPressEvent={() => {
                onConfirm();
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
