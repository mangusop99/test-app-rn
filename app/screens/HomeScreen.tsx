import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { productApi } from "../api/axios";
import { ThemedButton, ThemedText } from "../components/common";
import ThemeToggle from "../components/common/ThemeToggle"; // PASTIKAN INI ADA
import ErrorState from "../components/ErrorState";
import LoadingIndicator from "../components/LoadingIndicator";
import ProductListItem from "../components/ProductListItem";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { AppStackParamList } from "../navigation/AppNavigator";
import { Product } from "../types";

type HomeProps = NativeStackScreenProps<AppStackParamList, "Home">;

const HomeScreen = ({ navigation }: HomeProps) => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const styles = createThemedStyles(theme);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await productApi.get("/products?limit=10");
      setProducts(response.data.products);
      setIsError(false);
    } catch (e) {
      console.error("API Fetch Error:", e);
      setIsError(true);
      Alert.alert("API Error", "Gagal memuat daftar produk.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem
      product={item}
      onPress={() => navigation.navigate("Detail", { productId: item.id })}
    />
  );

  if (isLoading && !isRefreshing) {
    return <LoadingIndicator message="Fetching products..." />;
  }

  if (isError && products.length === 0) {
    return <ErrorState onRetry={fetchProducts} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeTextContainer}>
          <ThemedText variant="body">Selamat Datang,</ThemedText>
          <ThemedText variant="h2" style={styles.emailText}>
            {user?.email}
          </ThemedText>
        </View>
        <ThemeToggle />
      </View>

      {products.length === 0 && !isError && (
        <View style={styles.emptyState}>
          <ThemedText variant="body">
            Tidak ada produk yang tersedia.
          </ThemedText>
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
      <View style={styles.logoutContainer}>
        <ThemedButton title="Logout" onPress={signOut} variant="secondary" />
      </View>
    </View>
  );
};

const createThemedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContent: {
      paddingBottom: theme.spacing.xxl,
    },
    welcomeCard: {
      backgroundColor: theme.colors.card,
      padding: theme.spacing.m,
      marginHorizontal: theme.spacing.m,
      marginVertical: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...theme.shadow.small,
    },
    welcomeTextContainer: {
      flex: 1,
    },
    emailText: {
      color: theme.colors.primary,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.l,
    },
    logoutContainer: {
      padding: theme.spacing.m,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
  });

export default HomeScreen;
