import CustomIconButton from "@app/components/Inputs/CustomIconButton";
import { Home, OnBoarding, Settings, Task } from "@app/navigation/routes";
import AccountPage from "@app/screens/account/AccountPage";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import HomePage from "@app/screens/home/HomePage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import SettingsPage from "@app/screens/settings/SettingsPage";
import FamilyStatsPage from "@app/screens/stats/FamilyStatsPage";
import TaskPage from "@app/screens/task/TaskPage";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
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
  SettingsPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const bgColor = useTheme();
  const navTheme = DefaultTheme;
  navTheme.colors.background = bgColor;
  const baseHeader = ({ navigation }) => ({
    headerShown: true,
    title: "",
    headerTransparent: true,
    headerTintColor: "black",
    header: () =>
      navigation.canGoBack() ? (
        <SafeAreaView style={styles.headerStyle}>
          <CustomIconButton
            onPress={() => navigation.goBack()}
            iconName="chevron-left"
            iconType="font-awesome-5"
          />
        </SafeAreaView>
      ) : null,
  });

  const seeSettingsButtonHeaderOptions = ({ navigation }) => ({
    ...baseHeader({ navigation }),
    header: () => (
      <SafeAreaView style={styles.headerStyle}>
        {navigation.canGoBack() ? (
          <CustomIconButton
            onPress={() => navigation.goBack()}
            iconName="chevron-left"
            iconType="font-awesome-5"
          />
        ) : null}
        <CustomIconButton
          onPress={() => navigation.navigate(Settings.SettingsPage)}
          iconName="settings"
          iconType=""
        />
      </SafeAreaView>
    ),
  });

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator
            initialRouteName={OnBoarding.LoginPage}
            screenOptions={baseHeader}
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
            <Stack.Screen
              name={Home.AccountPage}
              component={AccountPage}
              options={seeSettingsButtonHeaderOptions}
            />
            <Stack.Screen
              name={Home.FamilyStatsPage}
              component={FamilyStatsPage}
            />
            <Stack.Screen name={Task.MyTaskPage} component={TaskPage} />
            <Stack.Screen name={Task.OtherTaskPage} component={TaskPage} />
            <Stack.Screen name={Home.HomePage} component={HomePage} />
            <Stack.Screen
              name={Settings.SettingsPage}
              component={SettingsPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
