import AccountPage from "@app/screens/account/AccountPage";
import ChooseGroupPage from "@app/screens/chooseGroup/ChooseGroupPage";
import CreateGroupPage from "@app/screens/group/CreateGroupPage";
import JoinGroupPage from "@app/screens/group/JoinGroupPage";
import LoginPage from "@app/screens/login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseGroupPage: undefined;
  CreateGroupPage: undefined;
  JoinGroupPage: undefined;
  AccountPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ChooseGroupPage" component={ChooseGroupPage} />
          <Stack.Screen name="CreateGroupPage" component={CreateGroupPage} />
          <Stack.Screen name="JoinGroupPage" component={JoinGroupPage} />
          <Stack.Screen name="AccountPage" component={AccountPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
