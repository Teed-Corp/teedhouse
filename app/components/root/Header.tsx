import CustomIconButton from "@app/components/common/Inputs/CustomIconButton";
import { Root } from "@app/navigation/routes";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
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
    <SafeAreaView style={styles.headerStyle}>
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

const styles = StyleSheet.create({
  headerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Header;
