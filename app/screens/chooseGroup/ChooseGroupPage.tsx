import GroupButton from "@app/screens/chooseGroup/components/GroupButton";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { OnBoarding } from "@app/navigation/routes";

const ChooseGroupPage = () => {
  const navigation: any = useNavigation();

  const handlePressCreateGroup = () => {
    navigation.navigate(OnBoarding.CreateGroupPage);
  };
  const handlePressJoinGroup = () => {
    navigation.navigate(OnBoarding.JoinGroupPage);
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

export default ChooseGroupPage;
