import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemedText } from "./common";

const LoadingIndicator = ({
  message = "Loading data...",
}: {
  message?: string;
}) => {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <ThemedText variant="callout" style={styles.message}>
        {message}
      </ThemedText>
    </View>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    message: {
      marginTop: theme.spacing.m,
      color: theme.colors.textSecondary,
    },
  });

export default LoadingIndicator;
