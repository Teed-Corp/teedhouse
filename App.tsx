import ChooseGroupPage from "@app/screens/chooseGroup/ChooseGroupPage";
import CreateGroupPage from "@app/screens/group/CreateGroupPage";
import JoinGroupPage from "@app/screens/group/JoinGroupPage";
import LoginPage from "@app/screens/login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OnBoarding } from "@app/navigation/routes";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseGroupPage: undefined;
  CreateGroupPage: undefined;
  JoinGroupPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={OnBoarding.Login}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={OnBoarding.Login} component={LoginPage} />
          <Stack.Screen
            name={OnBoarding.ChooseGroup}
            component={ChooseGroupPage}
          />
          <Stack.Screen
            name={OnBoarding.CreateGroup}
            component={CreateGroupPage}
          />
          <Stack.Screen name={OnBoarding.JoinGroup} component={JoinGroupPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
