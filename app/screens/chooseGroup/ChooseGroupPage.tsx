import GroupButton from "@app/screens/chooseGroup/components/GroupButton";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { OnBoarding } from "@app/navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseGroupPage = () => {
  const navigation: any = useNavigation();

  const handlePressCreateGroup = () => {
    navigation.navigate(OnBoarding.CreateGroupPage);
  };
  const handlePressJoinGroup = () => {
    navigation.navigate(OnBoarding.JoinGroupPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GroupButton
        onPressEvent={handlePressCreateGroup}
        isJoinGroup={false}
        title="Créer un groupe"
      />
      <View />
      <View style={styles.divider}></View>
      <GroupButton
        onPressEvent={handlePressJoinGroup}
        isJoinGroup
        title="Rejoindre un groupe"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  divider: {
    paddingVertical: "5%",
  },
});

export default ChooseGroupPage;
