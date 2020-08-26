import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Theme from "../constants/Theme";

const ShopStack = createStackNavigator();

const ShopNavigator = () => (
  <ShopStack.Navigator
    initialRouteName="ProductsOverview"
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
    <ShopStack.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={{ headerTitle: "All Products" }}
    />
    <ShopStack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: "My Cart" }}
    />
    <ShopStack.Screen name="ProductDetails" component={ProductDetailScreen} />
  </ShopStack.Navigator>
);

export default ShopNavigator;
