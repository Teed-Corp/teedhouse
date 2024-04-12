import { OnBoarding } from "@app/navigation/routes";
import ChooseFamilyPage from "@app/screens/family/ChooseFamilyPage";
import CreateFamilyPage from "@app/screens/family/CreateFamilyPage";
import JoinFamilyPage from "@app/screens/family/JoinFamilyPage";
import LoginPage from "@app/screens/login/LoginPage";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
  CreateFamilyPage: undefined;
  JoinFamilyPage: undefined;
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
