import { useAuth } from "@app/context/AuthContext";
import { useFamily } from "@app/context/FamilyContext";
import OnBoardingNavigation from "@app/navigation/OnBoardingNavigation";
import RootNavigation from "@app/navigation/RootNavigation";
import SplashScreenPage from "@app/screens/root/SplashScreenPage";
import Theme from "@app/theme/Theme";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

const NavigationProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, initAuthContext } = useAuth();
  const { isJoinedFamily, initFamilyContext } = useFamily();

  useEffect(() => {
    const bootstrapAsync = async () => {
      // Initialize the session to check if the user is authenticated (isAuthenticated becomes true)
      // and get the family information if the user has already joined a family (isJoinedFamily becomes true)
      await initAuthContext();
      await initFamilyContext();
      setIsLoading(false);
    };

    bootstrapAsync().catch(console.error);
  }, []);

  if (isLoading) {
    // Loading context
    return <SplashScreenPage />;
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: Theme.bgColor },
      }}
    >
      {isAuthenticated && isJoinedFamily ? (
        <RootNavigation />
      ) : (
        <OnBoardingNavigation />
      )}
    </NavigationContainer>
  );
};

export default NavigationProvider;
