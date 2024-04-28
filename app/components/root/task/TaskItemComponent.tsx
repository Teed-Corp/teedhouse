import PieceComponent from "@app/components/common/Content/PieceComponent";
import { useFamily } from "@app/context/FamilyContext";
import { useProfile } from "@app/context/ProfileContext";
import { completed_task, profile, task } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TaskItemComponent = ({ item }: { item: completed_task }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<profile>(null);
  const [task, setTask] = useState<task>(null);
  const { getProfileById } = useProfile();
  const { getTaskById } = useFamily();

  useEffect(() => {
    const fetch = async () => {
      setProfile(await getProfileById(item.profileId));
      setTask((await getTaskById(item.taskId)).data);
      setIsLoading(false);
    };

    fetch().catch(console.error);
  }, []);

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      {/*{item.type === "car" ? (*/}
      {/*  <CarIcon />*/}
      {/*) : item.type === "shopping" ? (*/}
      {/*  <ShoppingIcon />*/}
      {/*) : (*/}
      {/*  <HouseHoldIcon />*/}
      {/*)}*/}
      <View style={styles.detailsContainer}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={styles.name}>{profile.firstname}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.piece}>
          <PieceComponent />
        </View>
        <View style={styles.scoreWrapper}>
          <Text style={styles.score}>{task.points}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    width: "100%",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  image: {
    backgroundColor: "#212121",
    opacity: 0.05,
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  piece: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default TaskItemComponent;
