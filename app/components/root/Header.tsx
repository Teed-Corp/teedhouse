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
      <Text
        className={`text-2xl font-bold pt-1 flex-1 text-center ${
          showSettingsButton ? "" : "pr-10"
        }`}
      >
        {route.name}
      </Text>
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
