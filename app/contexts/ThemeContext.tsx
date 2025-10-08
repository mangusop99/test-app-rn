import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme, darkTheme, lightTheme } from "../theme";

const THEME_KEY = "app_theme";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === "dark") {
          setIsDark(true);
          setTheme(darkTheme);
        }
      } catch (e) {
        console.error("Failed to load theme.", e);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDark ? lightTheme : darkTheme;
    const newIsDark = !isDark;

    setTheme(newTheme);
    setIsDark(newIsDark);

    try {
      await AsyncStorage.setItem(THEME_KEY, newIsDark ? "dark" : "light");
    } catch (e) {
      console.error("Failed to save theme.", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
