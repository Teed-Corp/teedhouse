import appTheme from "@app/theme/Theme";
import React, { createContext, useContext, useState } from "react";

type ThemeContextType = {
  theme: typeof appTheme;
  setTheme: React.Dispatch<React.SetStateAction<typeof appTheme>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(appTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
