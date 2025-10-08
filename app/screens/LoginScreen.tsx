import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedButton, ThemedText } from "../components/common";
import LoadingIndicator from "../components/LoadingIndicator";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { isValidEmail } from "../utils/validation";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Email dan Password wajib diisi.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Error", "Format email yang Anda masukkan tidak valid.");
      return;
    }

    setLoading(true);
    try {
      const mockToken = `mock-token-${trimmedEmail}`;
      const mockUserEmail = trimmedEmail;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await signIn(mockToken, mockUserEmail);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Gagal",
        "Email atau password salah. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Mengautentikasi..." />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <ThemedText variant="h1" style={styles.title}>
          Masuk
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <ThemedButton
          title="Sign In"
          onPress={handleLogin}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing.l,
      backgroundColor: theme.colors.background,
    },
    card: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.l,
      ...theme.shadow.medium,
    },
    title: {
      marginBottom: theme.spacing.xl,
      textAlign: "center",
    },
    input: {
      height: 50,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: theme.borderRadius.m,
      marginBottom: theme.spacing.m,
      paddingHorizontal: theme.spacing.m,
      backgroundColor: theme.colors.backgroundSecondary,
      color: theme.colors.text,
    },
    button: {
      marginTop: theme.spacing.s,
    },
  });

export default LoginScreen;
