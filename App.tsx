import ContextProvider from "@app/context/ContextProvider";
import NavigationProvider from "@app/navigation/NavigationProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <NavigationProvider />
      </SafeAreaProvider>
    </ContextProvider>
  );
};

export default App;
