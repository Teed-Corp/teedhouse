import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfilePicture from "@app/components/Content/ProfilePicture";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import Divider from "@app/components/Divider";

const HomePageHeader = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <TouchableOpacity
          onPress={() => {
            console.log("Open profile");
          }}
        >
          <ProfilePicture uri={user.profilePicture} imageStyle={styles.image} />
        </TouchableOpacity>
        <Divider width={16} />
        <View style={styles.nameContainer}>
          <Text style={styles.helloLabel}>Bonjour</Text>
          <Text style={styles.nameLabel}>{user.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("Open stats");
        }}
      >
        <HeaderIcon icon={"bar-chart"} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  helloLabel: {
    fontSize: 16,
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomePageHeader;
