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
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  appTheme: string;
  setAppTheme: (theme: string) => void;
  theme: Theme;
  // useSystem: boolean;
  // setUseSystem: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme() || "light";
  const [appTheme, setAppTheme] = useState<string>("auto");
  // const [useSystem, setUseSystem] = useState<boolean>(true);
  useEffect(() => {
    const loadStoredTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("storedTheme");
        if (storedTheme) {
          setAppTheme(storedTheme);
          // setUseSystem(storedTheme === "auto");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadStoredTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("storedTheme", appTheme);
      } catch (error) {
        console.error("Error saving theme:", error);
      }
    };

    saveTheme();
  }, [appTheme]);

  const getTheme = (systemTheme: string, appTheme: string) => {
    if (appTheme === "auto") return systemTheme === "dark" ? darkT : lightT;
    return appTheme === "dark" ? darkT : lightT;
  };

  const theme = getTheme(systemTheme, appTheme);

  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
