import { Home, OnBoarding, Task } from "@app/navigation/routes";
import AccountPage from "@app/screens/account/AccountPage";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import FamilyStatsPage from "@app/screens/stats/FamilyStatsPage";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TaskPage from "@app/screens/task/TaskPage";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
  CreateFamilyPage: undefined;
  JoinFamilyPage: undefined;
  GetUserInformationPage: undefined;
  AccountPage: undefined;
  TaskPage: undefined;
  FamilyStatsPage: undefined;
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
            initialRouteName={OnBoarding.LoginPage}
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
            <Stack.Screen
              name={Home.FamilyStatsPage}
              component={FamilyStatsPage}
            />
            <Stack.Screen name={Task.TaskPage} component={TaskPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
