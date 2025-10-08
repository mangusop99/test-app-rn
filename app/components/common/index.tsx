import React from "react";
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ThemedTextProps extends TextProps {
  variant?: "h1" | "h2" | "body" | "callout" | "footnote";
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const variantStyle = theme.typography[variant];

  return <Text style={[variantStyle, style]} {...props} />;
};

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = "primary",
  isLoading = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const buttonStyle: ViewStyle = {
    backgroundColor:
      variant === "primary" ? theme.colors.primary : theme.colors.card,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: variant === "secondary" ? 1 : 0,
    borderColor: theme.colors.border,
    ...theme.shadow.medium,
  };

  const textStyle = {
    color: variant === "primary" ? theme.colors.white : theme.colors.text,
    fontWeight: "bold" as const,
    fontSize: 16,
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={
            variant === "primary" ? theme.colors.white : theme.colors.primary
          }
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
