import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/ui/HeaderButton";
import UserProductScreen from "../screens/user/UserProductScreen";
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
      })}
    />
    <UserStack.Screen
      name="EditProducts"
      component={Edit}
      options={({ navigation, route }) => ({
        headerTitle: "Edit Product",
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
      })}
    />
  </UserStack.Navigator>
);

export default AdminNavigator;
