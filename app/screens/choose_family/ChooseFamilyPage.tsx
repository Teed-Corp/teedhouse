import GroupButton from "@app/screens/choose_family/components/GroupButton";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const ChooseFamilyPage = () => {
  const navigation: any = useNavigation();

  const handlePressCreateGroup = () => {
    navigation.navigate("LoginPage");
  };
  const handlePressJoinGroup = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
      <GroupButton
        onPressEvent={handlePressCreateGroup}
        isJoinGroup={false}
        title="Créer un groupe"
      />
      <View style={{ marginVertical: -100 }} />
      <GroupButton
        onPressEvent={handlePressJoinGroup}
        isJoinGroup
        title="Rejoindre un groupe"
      />
    </View>
  );
};

export default ChooseFamilyPage;
