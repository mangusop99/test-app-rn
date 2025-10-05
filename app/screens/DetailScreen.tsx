import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { productApi } from "../api/axios";
import { ThemedButton, ThemedText } from "../components/common";
import ErrorState from "../components/ErrorState";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductListItem from "../components/ProductListItem";
import { useTheme } from "../contexts/ThemeContext";
import { AppStackParamList } from "../navigation/AppNavigator";
import { Product } from "../types";

type DetailProps = NativeStackScreenProps<AppStackParamList, "Detail">;

const DetailScreen = ({ route, navigation }: DetailProps) => {
  const { productId } = route.params;
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await productApi.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (e) {
      console.error("Detail Fetch Error:", e);
      setIsError(true);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (isLoading) {
    return <LoadingIndicator message={`Mencari detail produk...`} />;
  }

  if (isError) {
    return <ErrorState onRetry={fetchDetail} />;
  }

  if (!product) {
    return (
      <View style={styles.centeredContainer}>
        <ThemedText variant="body" style={styles.emptyText}>
          Produk tidak ditemukan.
        </ThemedText>
        <ThemedButton title="Kembali" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ProductListItem product={product} isDetailHeader={true} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={styles.mainImage} />
        </View>
        <View style={styles.card}>
          <ThemedText variant="h2" style={styles.sectionTitle}>
            Deskripsi
          </ThemedText>
          <ThemedText variant="body">{product.description}</ThemedText>
        </View>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <ThemedText variant="body" style={styles.infoLabel}>
              Kategori
            </ThemedText>
            <ThemedText variant="callout" style={styles.infoValue}>
              {product.category}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText variant="body" style={styles.infoLabel}>
              Stok
            </ThemedText>
            <ThemedText variant="callout" style={styles.infoValue}>
              {product.stock} pcs
            </ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.m,
    },
    imageContainer: {
      alignItems: "center",
      marginVertical: theme.spacing.l,
    },
    mainImage: {
      width: "80%",
      height: 250,
      borderRadius: theme.borderRadius.l,
      ...theme.shadow.medium,
    },
    card: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      marginBottom: theme.spacing.m,
      ...theme.shadow.small,
    },
    sectionTitle: {
      marginBottom: theme.spacing.s,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing.s,
    },
    infoLabel: {
      fontWeight: "600",
    },
    infoValue: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.l,
    },
    emptyText: {
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.m,
      textAlign: "center",
    },
  });

export default DetailScreen;
