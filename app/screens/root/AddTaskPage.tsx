import ErrorText from "@app/components/common/Content/ErrorText";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDropdown from "@app/components/common/Inputs/CustomDropDown";
import { useFamily } from "@app/context/FamilyContext";
import { Root } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTaskPage() {
  const { getFamilyTasks, getFamilyMembers, completeTask } = useFamily();

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  const navigation: any = useNavigation();

  const onConfirm = async () => {
    setDisplayError(true);
    if (selectedTask !== null && selectedMembers !== null) {
      await completeTask(selectedTask, selectedMembers);
      navigation.navigate(Root.HomePage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setTasks(
        (await getFamilyTasks()).data.map((value) => ({
          label: value.name,
          value: value.id,
        })),
      );
      setMembers(
        (await getFamilyMembers()).data.map((data) => ({
          label: data.firstname,
          value: data.id,
        })),
      );

      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <CustomLoader />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          <CustomDropdown
            data={tasks}
            onSelect={setSelectedTask}
            value={selectedTask}
            placeHolder="Tâche"
            displayTopPlaceHolder
            zindex={3}
          />
          {selectedTask === null && displayError && (
            <ErrorText error="Une tâche est requise" />
          )}
          <Divider height={20} />
          <CustomDropdown
            data={members}
            onSelect={setSelectedMembers}
            value={selectedMembers}
            placeHolder="Personne qui a effectué la tâche"
            displayTopPlaceHolder
            zindex={2}
          />
          {selectedMembers === null && displayError && (
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
