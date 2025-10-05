import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";

export type AppStackParamList = {
  Home: undefined;
  Detail: { productId: number };
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.white,
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Product List" }}
      />
      <AppStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Product Detail" }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
