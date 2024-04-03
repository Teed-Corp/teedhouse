import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

const ChooseFamilyPage = () => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    navigation.navigate("LoginPage");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Salut</Text>
      <Button onPress={handlePress} />
    </View>
  );
};

export default ChooseFamilyPage;
