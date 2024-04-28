import AuthProvider from "@app/context/AuthContext";
import FamilyProvider from "@app/context/FamilyContext";
import { ThemeProvider } from "@app/context/ThemeContext";
import NavigationProvider from "@app/navigation/NavigationProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <AuthProvider>
      <FamilyProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationProvider />
          </SafeAreaProvider>
        </ThemeProvider>
      </FamilyProvider>
    </AuthProvider>
  );
};

export default App;
