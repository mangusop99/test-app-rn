import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);

  return (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    toggleButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      ...theme.shadow.small,
    },
  });

export default ThemeToggle;
