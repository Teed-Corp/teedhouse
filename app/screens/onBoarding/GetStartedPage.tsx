import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "@app/components/common/Divider";
import { useNavigation } from "@react-navigation/native";
import { OnBoarding } from "@app/navigation/routes";
import AppButton from "@app/components/common/Inputs/AppButton";

const GetStartedPage = () => {
  const navigation: any = useNavigation();
  const handleGetStarted = () => {
    navigation.navigate(OnBoarding.RegisterPage);
  };

  const handleAlreadyAccount = () => {
    navigation.navigate(OnBoarding.LoginPage);
  };

  return (
    <SafeAreaView className="h-full w-full flex px-5 items-center">
      <ScrollView className="flex-grow">
        <Divider height={30} />
        <Text className="text-3xl text-primary font-bold text-center">
          TeedHouse
        </Text>
        <Divider height={40} />
        <Image
          source={require("/Users/mathisperso/Desktop/TeedHouse/teedhouse/assets/onboarding-image.png")}
          className="h-80 w-80"
        />
        <Divider height={40} />
        <Text className="text-center text-xl font-bold">
          Organisez vous dans vos tâches méngères
        </Text>
        <Divider height={10} />
        <Text className="text-center text-lg">
          Gagnez des points en réalisant les tâches et devenez le meilleur de
          votre famille
        </Text>
        <Divider height={30} />

        <AppButton title="Commencer" onPressEvent={handleGetStarted} />
        <Divider height={15} />
        <TouchableOpacity onPress={handleAlreadyAccount}>
          <Text className="text-center text-primary">
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetStartedPage;
