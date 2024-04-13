import React, { createContext, useContext, useState } from "react";
import theme from "@app/theme/theme";

const ThemeContext = createContext(theme.bgColor);

export const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState(theme.bgColor);

  const updateBgColor = (newColor: React.SetStateAction<string>) => {
    setBgColor(newColor);
  };

  return (
    <ThemeContext.Provider value={bgColor}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
