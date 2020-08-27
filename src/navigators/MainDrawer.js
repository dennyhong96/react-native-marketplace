import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { logout } from "../redux/actions/auth";
import ShopNavigator from "./Shop";
import AdminNavigator from "./Admin";
import OrderNavigator from "./Orders";
import Theme from "../constants/Theme";

const MainDrawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  const dispatch = useDispatch();

  return (
    <MainDrawer.Navigator
      drawerContentOptions={{
        activeTintColor: Theme.primary,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
            <DrawerItem
              onPress={() => dispatch(logout())}
              label="Logout"
              icon={({ color }) => (
                <MaterialCommunityIcons name="logout" size={24} color={color} />
              )}
            />
          </DrawerContentScrollView>
        );
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
};

export default MainDrawerNavigator;
