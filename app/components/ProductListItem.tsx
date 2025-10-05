import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Product } from "../types";
import { ThemedText } from "./common";

interface ProductListItemProps {
  product: Product;
  onPress?: () => void;
  isDetailHeader?: boolean;
}

const ProductListItem = ({
  product,
  onPress,
  isDetailHeader = false,
}: ProductListItemProps) => {
  const { theme } = useTheme();
  const styles = createThemedStyles(theme, isDetailHeader);

  const content = (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <ThemedText
          variant="h2"
          numberOfLines={isDetailHeader ? 2 : 1}
          style={styles.title}
        >
          {product.title}
        </ThemedText>
        <ThemedText variant="h1" style={styles.price}>
          ${product.price.toFixed(2)}
        </ThemedText>
        {!isDetailHeader && (
          <ThemedText variant="footnote" style={styles.category}>
            {product.category}
          </ThemedText>
        )}
      </View>
    </View>
  );

  return onPress && !isDetailHeader ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.touchableWrapper}
    >
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

const createThemedStyles = (theme: any, isDetailHeader: boolean) =>
  StyleSheet.create({
    touchableWrapper: {
      marginHorizontal: theme.spacing.m,
      marginVertical: theme.spacing.s,
      ...theme.shadow.medium,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.m,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.m,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: theme.borderRadius.s,
      marginRight: theme.spacing.m,
    },
    info: {
      flex: 1,
    },
    title: {
      marginBottom: theme.spacing.s,
    },
    price: {
      color: theme.colors.success,
    },
    category: {
      marginTop: theme.spacing.s,
      textTransform: "capitalize",
    },
  });

export default ProductListItem;
