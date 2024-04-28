import AuthProvider from "@app/context/AuthContext";
import FamilyProvider from "@app/context/FamilyContext";
import ProfileProvider from "@app/context/ProfileContext";
import { ThemeProvider } from "@app/context/ThemeContext";
import { ReactNode } from "react";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <FamilyProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </FamilyProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
