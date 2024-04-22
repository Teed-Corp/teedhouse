import GoBackButton from "@app/components/GoBackButton";
import { Home, OnBoarding, Task } from "@app/navigation/routes";
import AccountPage from "@app/screens/account/AccountPage";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import HomePage from "@app/screens/home/HomePage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import FamilyStatsPage from "@app/screens/stats/FamilyStatsPage";
import TaskPage from "@app/screens/task/TaskPage";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
  CreateFamilyPage: undefined;
  JoinFamilyPage: undefined;
  GetUserInformationPage: undefined;
  AccountPage: undefined;
  MyTaskPage: undefined;
  OtherTaskPage: undefined;
  FamilyStatsPage: undefined;
  HomePage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const bgColor = useTheme();
  const navTheme = DefaultTheme;
  navTheme.colors.background = bgColor;
  const canGoBackHeaderOptions = ({ navigation }) => ({
    headerShown: true,
    title: "",
    headerTransparent: true,
    headerTintColor: "black",
    header: () => (
      <SafeAreaView style={{ marginLeft: 20, marginTop: 10 }}>
        <GoBackButton navigation={navigation} />
      </SafeAreaView>
    ),
  });

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
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen
              name={OnBoarding.JoinFamilyPage}
              component={JoinFamilyPage}
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen
              name={OnBoarding.GetUserInformationPage}
              component={GetUserInformationPage}
            />
            <Stack.Screen
              name={Home.AccountPage}
              component={AccountPage}
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen
              name={Home.FamilyStatsPage}
              component={FamilyStatsPage}
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen
              name={Task.MyTaskPage}
              component={TaskPage}
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen
              name={Task.OtherTaskPage}
              component={TaskPage}
              options={canGoBackHeaderOptions}
            />
            <Stack.Screen name={Home.HomePage} component={HomePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
