import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import { useAuth } from "@app/context/AuthContext";
import { Root } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigation: any = useNavigation();

  const handleDisconnect = async () => {
    await logout();
  };

  const handleChangePassword = async () => {
    navigation.navigate(Root.ChangePasswordPage);
  };

  return (
    <SafeAreaView className="flex justify-start px-5">
      <ScrollView>
        <Divider height={80} />
        <AppButton
          title="Changer le mot de passe"
          onPressEvent={handleChangePassword}
        />
        <Divider height={20} />
        <AppButton title="Se déconnecter" onPressEvent={handleDisconnect} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;
