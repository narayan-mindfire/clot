import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import darkT from "../Themes/dark";
import lightT from "../Themes/light";
import { Theme } from "@react-navigation/native";
interface ThemeContextType {
  dark: boolean;
  useSystem: boolean;
  setUseSystem: (value: boolean) => void;
  toggleTheme: (value: string) => void;
  appTheme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(true);
  const toggleTheme = (value: string) => {
    setUseSystem(false);
    setDark(value === "dark");
    console.log(`use system theme: ${useSystem}`);
  };
  const [useSystem, setUseSystem] = useState<boolean>(false);
  const systemTheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<Theme>(
    useSystem
      ? systemTheme === "dark"
        ? darkT
        : lightT
      : dark
      ? darkT
      : lightT
  );

  useEffect(() => {
    setAppTheme(
      useSystem
        ? systemTheme === "dark"
          ? darkT
          : lightT
        : dark
        ? darkT
        : lightT
    );
  }, [systemTheme, dark, useSystem]);

  return (
    <ThemeContext.Provider
      value={{ dark, useSystem, setUseSystem, toggleTheme, appTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
