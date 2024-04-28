import CustomIconButton from "@app/components/common/Inputs/CustomIconButton";
import { Root } from "@app/navigation/routes";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({
  route,
  navigation,
  showSettingsButton = false,
}: {
  route?: RouteProp<ParamListBase, string>;
  navigation?: any;
  showSettingsButton?: boolean;
}) => {
  return (
    <SafeAreaView className="mx-5 mt-3 flex flex-row justify-between">
      <CustomIconButton
        onPress={() => navigation.goBack()}
        iconName="chevron-left"
        iconType="font-awesome-5"
      />
      <Text>{route.name}</Text>
      {showSettingsButton && (
        <CustomIconButton
          onPress={() => navigation.navigate(Root.SettingsPage)}
          iconName="settings"
          iconType=""
        />
      )}
    </SafeAreaView>
  );
};

export default Header;
