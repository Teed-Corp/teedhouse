import { OnBoarding } from "@app/navigation/routes";
import ChooseFamilyPage from "@app/screens/onBoarding/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/onBoarding/CreateFamilyPage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import JoinFamilyPage from "@app/screens/onBoarding/JoinFamilyPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedPage from "@app/screens/onBoarding/GetStartedPage";
import Header from "@app/components/root/Header";
import RegisterPage from "@app/screens/onBoarding/RegisterPage";

const Stack = createNativeStackNavigator();

const OnBoardingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={OnBoarding.GetStartedPage}
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        header: (props) =>
          props.navigation.canGoBack() ? (
            <Header {...props} showTitle={false} />
          ) : null,
      }}
    >
      <Stack.Screen
        name={OnBoarding.GetStartedPage}
        component={GetStartedPage}
      />
      <Stack.Screen name={OnBoarding.LoginPage} component={LoginPage} />
      <Stack.Screen name={OnBoarding.RegisterPage} component={RegisterPage} />
      <Stack.Screen
        name={OnBoarding.ChooseFamilyPage}
        component={ChooseFamilyPage}
      />
      <Stack.Screen
        name={OnBoarding.CreateFamilyPage}
        component={CreateFamilyPage}
      />
      <Stack.Screen
        name={OnBoarding.JoinFamilyPage}
        component={JoinFamilyPage}
      />
      <Stack.Screen
        name={OnBoarding.GetUserInformationPage}
        component={GetUserInformationPage}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingNavigation;
