import CustomIconButton from "@app/components/Inputs/CustomIconButton";
import useAuth from "@app/hooks/Auth";
import { Home, OnBoarding, Settings, Task } from "@app/navigation/routes";
import AccountPage from "@app/screens/account/AccountPage";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import AddTaskPage from "@app/screens/home/AddTaskPage";
import HomePage from "@app/screens/home/HomePage";
import InformationTaskPage from "@app/screens/home/InformationTaskPage";
import GetUserInformationPage from "@app/screens/onBoarding/GetUserInformationPage";
import LoginPage from "@app/screens/onBoarding/LoginPage";
import SettingsPage from "@app/screens/settings/SettingsPage";
import FamilyStatsPage from "@app/screens/stats/FamilyStatsPage";
import TaskPage from "@app/screens/task/TaskPage";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
  CreateFamilyPage: undefined;
  JoinFamilyPage: undefined;
  GetUserInformationPage: undefined;
  AccountPage: undefined;
  TaskPage: undefined;
  FamilyStatsPage: undefined;
  HomePage: undefined;
  AddTaskPage: undefined;
  InformationTaskPage: undefined;
};


const Stack = createNativeStackNavigator<OnBoarding & Task & Home & Settings>();

export default function App() {
  const { getSession } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();
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

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const session = await getSession();
      setIsUserLoggedIn(session !== null);
    };

    checkIfUserIsLoggedIn().catch(console.error);
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          {isUserLoggedIn ? (
            <Stack.Navigator
              initialRouteName={Home.HomePage}
              screenOptions={baseHeader}
            >
              <Stack.Screen name={Home.HomePage} component={HomePage} />
              <Stack.Screen name={Task.MyTaskPage} component={TaskPage} />
              <Stack.Screen name={Task.OtherTaskPage} component={TaskPage} />
                <Stack.Screen name={Home.AddTaskPage} component={AddTaskPage} />
            <Stack.Screen
              name={Home.InformationTaskPage}
              component={InformationTaskPage}
            />
              <Stack.Screen
                name={Home.FamilyStatsPage}
                component={FamilyStatsPage}
              />
              <Stack.Screen
                name={Home.AccountPage}
                component={AccountPage}
                options={seeSettingsButtonHeaderOptions}
              />
              <Stack.Screen
                name={Settings.SettingsPage}
                component={SettingsPage}
              />
            </Stack.Navigator>
          ) : (
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
            </Stack.Navigator>
          )}
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
