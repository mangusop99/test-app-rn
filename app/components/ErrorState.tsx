import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ThemedButton, ThemedText } from "./common";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

const ErrorState = ({
  message = "Gagal memuat data. Silakan coba lagi.",
  onRetry,
}: ErrorStateProps) => {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color={theme.colors.error}
      />
      <ThemedText variant="body" style={styles.message}>
        {message}
      </ThemedText>
      <ThemedButton title="Coba Lagi" onPress={onRetry} variant="primary" />
    </View>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    message: {
      marginTop: theme.spacing.m,
      marginBottom: theme.spacing.l,
      textAlign: "center",
      color: theme.colors.textSecondary,
    },
  });

export default ErrorState;
