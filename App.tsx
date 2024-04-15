import { Home, OnBoarding } from "@app/navigation/routes";
import AccountPage from "@app/screens/account/AccountPage";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
  CreateFamilyPage: undefined;
  JoinFamilyPage: undefined;
  GetUserInformationPage: undefined;
  AccountPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const bgColor = useTheme();
  const navTheme = DefaultTheme;
  navTheme.colors.background = bgColor;

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            initialRouteName={OnBoarding.ChooseFamilyPage}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name={OnBoarding.LoginPage} component={LoginPage} />
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
            <Stack.Screen name={Home.AccountPage} component={AccountPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
