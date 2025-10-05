import { TextStyle, ViewStyle } from "react-native";

export interface Theme {
  colors: {
    primary: string;
    background: string;
    backgroundSecondary: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    white: string;
  };
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    body: TextStyle;
    callout: TextStyle;
    footnote: TextStyle;
  };
  shadow: {
    small: ViewStyle;
    medium: ViewStyle;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: "#007AFF",
    background: "#F2F2F7",
    backgroundSecondary: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    textSecondary: "#8E8E93",
    border: "#C6C6C8",
    error: "#FF3B30",
    success: "#34C759",
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: "bold" as const, color: "#000000" },
    h2: { fontSize: 22, fontWeight: "bold" as const, color: "#000000" },
    body: { fontSize: 16, color: "#000000" },
    callout: { fontSize: 14, color: "#000000" },
    footnote: { fontSize: 12, color: "#8E8E93" },
  },
  shadow: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#0A84FF",
    background: "#000000",
    backgroundSecondary: "#1C1C1E",
    card: "#2C2C2E",
    text: "#FFFFFF",
    textSecondary: "#98989F",
    border: "#38383A",
    error: "#FF453A",
    success: "#32D74B",
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: "bold" as const, color: "#FFFFFF" },
    h2: { fontSize: 22, fontWeight: "bold" as const, color: "#FFFFFF" },
    body: { fontSize: 16, color: "#FFFFFF" },
    callout: { fontSize: 14, color: "#FFFFFF" },
    footnote: { fontSize: 12, color: "#98989F" },
  },
  shadow: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 1.0,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
};
