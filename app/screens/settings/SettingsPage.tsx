import HeaderTitle from "@app/components/Content/HeaderTitle";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsPage = () => {
  const handleDisconnect = () => {
    console.log("Disconnect");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Divider height={20} />
        <HeaderTitle value="Paramètres" />
        <Divider height={20} />
        <AppButton title="Se déconnecter" onPressEvent={handleDisconnect} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});

export default SettingsPage;
