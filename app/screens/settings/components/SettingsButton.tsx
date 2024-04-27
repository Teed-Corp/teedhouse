import { Settings } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const SettingsButton = () => {
  const navigation: any = useNavigation();

  const handleSettings = () => {
    console.log("Settings");
    navigation.navigate(Settings.SettingsPage);
  };

  return (
    <TouchableOpacity onPress={handleSettings} style={styles.settings}>
      <Icon name="settings" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settings: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default SettingsButton;
