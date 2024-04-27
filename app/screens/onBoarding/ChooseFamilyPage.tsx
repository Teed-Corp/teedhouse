import FamilyButton from "@app/components/root/family/FamilyButton";
import { OnBoarding } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseFamilyPage = () => {
  const navigation: any = useNavigation();

  const handlePressCreateFamily = () => {
    navigation.navigate(OnBoarding.CreateFamilyPage);
  };
  const handlePressJoinFamily = () => {
    navigation.navigate(OnBoarding.JoinFamilyPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FamilyButton
        onPressEvent={handlePressCreateFamily}
        isJoinFamily={false}
        title="Créer une famille"
      />
      <View />
      <View style={styles.divider} />
      <FamilyButton
        onPressEvent={handlePressJoinFamily}
        isJoinFamily
        title="Rejoindre une famille"
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

export default ChooseFamilyPage;
