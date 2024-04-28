import AuthProvider from "@app/context/AuthContext";
import FamilyProvider from "@app/context/FamilyContext";
import ProfileProvider from "@app/context/ProfileContext";
import { ThemeProvider } from "@app/context/ThemeContext";
import NavigationProvider from "@app/navigation/NavigationProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <FamilyProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <NavigationProvider />
            </SafeAreaProvider>
          </ThemeProvider>
        </FamilyProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;
