import Divider from "@app/components/Divider";
import FamilyStatsCard from "@app/screens/stats/components/FamilyStatsCard";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const FamilyStatsList = ({ users }) => {
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <>
          <FamilyStatsCard user={item} />
          <Divider height={12} />
        </>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default FamilyStatsList;
