import HeaderIcon from "@app/components/Content/HeaderIcon";
import ProfilePicture from "@app/components/Content/ProfilePicture";
import Divider from "@app/components/Divider";
import { Home } from "@app/navigation/routes";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomePageHeader = ({ user, navigation }) => {
  const handlePressStats = () => {
    navigation.navigate(Home.FamilyStatsPage);
  };

  const handlePressProfile = () => {
    navigation.navigate(Home.AccountPage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPart}>
        <TouchableOpacity onPress={handlePressProfile}>
          <ProfilePicture uri={user.profilePicture} imageStyle={styles.image} />
        </TouchableOpacity>
        <Divider width={16} />
        <View style={styles.nameContainer}>
          <Text style={styles.helloLabel}>Bonjour</Text>
          <Text style={styles.nameLabel}>{user.name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePressStats}>
        <HeaderIcon icon="bar-chart" size={24} />
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
