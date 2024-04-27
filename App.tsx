import useAuth from "@app/hooks/Auth";
import OnBoardingNavigation from "@app/navigation/OnBoardingNavigation";
import RootNavigation from "@app/navigation/RootNavigation";
import { OnBoarding, Root } from "@app/navigation/routes";
import { ThemeProvider, useTheme } from "@app/theme/ThemeProvider";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<OnBoarding & Root & Root & Root>();

export default function App() {
  const { getSession } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();
  const bgColor = useTheme();
  const navTheme = DefaultTheme;
  navTheme.colors.background = bgColor;

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
          {isUserLoggedIn ? <RootNavigation /> : <OnBoardingNavigation />}
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
