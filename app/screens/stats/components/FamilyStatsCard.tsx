import PieceComponent from "@app/components/Content/PieceComponent";
import ProfilePicture from "@app/components/Content/ProfilePicture";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FamilyStatsCard = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.profilePictureContainer}>
          <ProfilePicture
            uri={user.profilePicture}
            imageStyle={styles.profilePicture}
            iconSize={30}
          />
        </View>
        <Text>{user.name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <PieceComponent />
        <Text style={styles.scoreText}>{user.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePictureContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(33, 33, 33, 0.1)",
    marginRight: 10,
    justifyContent: "center",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "700",
  },
});

export default FamilyStatsCard;
