import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
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
          headerTitle: "Products Overview",
        }}
      >
        <Stack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopStack;
