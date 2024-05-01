import Header from "@app/components/root/Header";
import { Root } from "@app/navigation/routes";
import AccountPage from "@app/screens/root/AccountPage";
import AddTaskPage from "@app/screens/root/AddTaskPage";
import FamilyStatsPage from "@app/screens/root/FamilyStatsPage";
import HomePage from "@app/screens/root/HomePage";
import InformationTaskPage from "@app/screens/root/InformationTaskPage";
import SettingsPage from "@app/screens/root/SettingsPage";
import TaskPage from "@app/screens/root/TaskPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePasswordPage from "@app/screens/root/ChangePasswordPage";

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
      <Stack.Screen
        name={Root.ChangePasswordPage}
        component={ChangePasswordPage}
      <Stack.Screen name={Root.AddTaskPage} component={AddTaskPage} />
      <Stack.Screen
        name={Root.InformationTaskPage}
        component={InformationTaskPage}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
