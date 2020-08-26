import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import HeaderButton from "../components/ui/HeaderButton";
import Theme from "../constants/Theme";

const UserStack = createStackNavigator();

const AdminNavigator = () => (
  <UserStack.Navigator>
    <UserStack.Screen
      name="UserProducts"
      component={UserProductScreen}
      options={({ navigation, route }) => ({
        headerTitle: "My Products",
        headerTintColor: Platform.OS === "ios" ? Theme.primary : "#fff",
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="open menu"
              iconName="menu"
              onPress={() => navigation.openDrawer()}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Create Product"
              iconName="plus"
              onPress={() => navigation.navigate("EditProducts")}
            />
          </HeaderButtons>
        ),
      })}
    />

    <UserStack.Screen
      name="EditProducts"
      component={EditProductScreen}
      options={({ navigation, route }) => ({
        headerTitle:
          route.params && route.params.id ? "Edit Product" : "Add Product",
        headerTintColor: Platform.OS === "ios" ? Theme.primary : "#fff",
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName="save" onPress={() => route.params.handleSubmit()} />
          </HeaderButtons>
        ),
      })}
    />
  </UserStack.Navigator>
);

export default AdminNavigator;
