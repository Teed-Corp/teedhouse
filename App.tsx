import ChooseFamilyPage from "@app/screens/choose_family/ChooseFamilyPage";
import LoginPage from "@app/screens/login/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type RootStackParamList = {
  LoginPage: undefined;
  ChooseFamilyPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ChooseFamilyPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ChooseFamilyPage" component={ChooseFamilyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
