import ErrorText from "@app/components/common/Content/ErrorText";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDropdown from "@app/components/common/Inputs/CustomDropDown";
import { Root } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTaskPage() {
  const [taskType, setTaskType] = useState(null);
  const [person, setPreson] = useState(null);
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
    if (taskType !== null && person !== null) {
      navigation.navigate(Root.HomePage, {
        taskType,
        person,
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
            placeHolder="Tâche"
            displayTopPlaceHolder
            zindex={3}
          />
          {taskType === null && displayError && (
            <ErrorText error="Une tâche est requise" />
          )}
          <Divider height={20} />
          <CustomDropdown
            data={familyData}
            onSelect={setPreson}
            value={person}
            placeHolder="Personne qui a effectué la tâche"
            displayTopPlaceHolder
            zindex={2}
          />
          {person === null && displayError && (
            <ErrorText error="Une personne est requise pour la tâche" />
          )}
          <Divider height={20} />
          <View style={styles.button}>
            <AppButton title="Suivant" onPressEvent={onConfirm} />
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
