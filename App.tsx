import ChooseGroupPage from "@app/screens/chooseGroup/ChooseGroupPage";
import LoginPage from "@app/screens/login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreateGroupPage from "@app/screens/group/CreateGroupPage";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseGroupPage: undefined;
  CreateGroupPage: undefined;
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
