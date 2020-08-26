import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import ShopNavigator from "./Shop";
import AdminNavigator from "./Admin";
import OrderNavigator from "./Orders";
import Theme from "../constants/Theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const MainDrawer = createDrawerNavigator();

const MainDrawerNavigator = () => (
  <MainDrawer.Navigator
    drawerContentOptions={{
      activeTintColor: Theme.primary,
    }}
  >
    <MainDrawer.Screen
      name="Shop"
      component={ShopNavigator}
      options={{
        drawerIcon: ({ color }) => {
          return <FontAwesome name="list-alt" size={24} color={color} />;
        },
      }}
    />
    <MainDrawer.Screen
      name="Order"
      component={OrderNavigator}
      options={{
        drawerLabel: "My Orders",
        drawerIcon: ({ color }) => (
          <Entypo name="shop" size={24} color={color} />
        ),
      }}
    />
    <MainDrawer.Screen
      name="User"
      component={AdminNavigator}
      options={{
        drawerLabel: "Admin",
        drawerIcon: ({ color }) => (
          <Feather name="user" size={24} color={color} />
        ),
      }}
    />
  </MainDrawer.Navigator>
);

export default MainDrawerNavigator;
