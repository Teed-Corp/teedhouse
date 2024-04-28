import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import { useAuth } from "@app/context/AuthContext";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsPage = () => {
  const { logout } = useAuth();

  const handleDisconnect = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex justify-start px-5">
      <ScrollView>
        <Divider height={20} />
        <HeaderTitle value="Paramètres" />
        <Divider height={20} />
        <AppButton title="Se déconnecter" onPressEvent={handleDisconnect} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;
