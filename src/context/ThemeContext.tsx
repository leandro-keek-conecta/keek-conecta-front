import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createDynamicTheme, defaultTheme } from "@/theme";

interface ThemeContextProps {
  updateThemeColor: (color: string) => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const useDynamicTheme = () => useContext(ThemeContext);

export function DynamicThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const corHex = user?.projeto?.corHex || defaultTheme.palette.primary.main;
    setTheme(createDynamicTheme(corHex));
  }, []);

  const updateThemeColor = (color: string) => {
    setTheme(createDynamicTheme(color));
  };

  return (
    <ThemeContext.Provider value={{ updateThemeColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
