import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Theme from "../constants/Theme";

const Stack = createStackNavigator();

const ShopStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "ios" ? undefined : Theme.primary,
          },
          headerTintColor: Platform.OS === "ios" ? Theme.primary : "#fff",
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
          options={{ headerTitle: "Product Overview" }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerTitle: "My Cart" }}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopStack;
