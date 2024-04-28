import Header from "@app/components/root/Header";
import { Root } from "@app/navigation/routes";
import AccountPage from "@app/screens/root/AccountPage";
import FamilyStatsPage from "@app/screens/root/FamilyStatsPage";
import HomePage from "@app/screens/root/HomePage";
import SettingsPage from "@app/screens/root/SettingsPage";
import TaskPage from "@app/screens/root/TaskPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Root.HomePage}
      screenOptions={{
        headerTransparent: true,
        header: (props) =>
          props.navigation.canGoBack() ? <Header {...props} /> : null,
      }}
    >
      <Stack.Screen name={Root.HomePage} component={HomePage} />
      <Stack.Screen name={Root.MyTaskPage} component={TaskPage} />
      <Stack.Screen name={Root.OtherTaskPage} component={TaskPage} />
      <Stack.Screen name={Root.FamilyStatsPage} component={FamilyStatsPage} />
      <Stack.Screen
        name={Root.AccountPage}
        component={AccountPage}
        options={{
          header: (props) => <Header {...props} showSettingsButton />,
        }}
      />
      <Stack.Screen name={Root.SettingsPage} component={SettingsPage} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
