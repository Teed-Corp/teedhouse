import ChooseFamilyPage from "@app/screens/choose_family/ChooseFamilyPage";
import LoginPage from "@app/screens/login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ChooseFamilyPage" component={ChooseFamilyPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
