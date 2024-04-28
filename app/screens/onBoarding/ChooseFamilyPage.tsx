import FamilyButton from "@app/components/onBoarding/family/FamilyButton";
import { OnBoarding } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
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
    <SafeAreaView className="flex flex-1 justify-center px-5">
      <FamilyButton
        onPressEvent={handlePressCreateFamily}
        isJoinFamily={false}
        title="Créer une famille"
      />
      <View />
      <View className="py-[5%]" />
      <FamilyButton
        onPressEvent={handlePressJoinFamily}
        isJoinFamily
        title="Rejoindre une famille"
      />
    </SafeAreaView>
  );
};

export default ChooseFamilyPage;
