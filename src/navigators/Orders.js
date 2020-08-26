import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/ui/HeaderButton";
import OrderScreen from "../screens/shop/OrderScreen";
import Theme from "../constants/Theme";

const OrderStack = createStackNavigator();

const OrderNavigator = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen
      name="Order"
      component={OrderScreen}
      options={({ navigation, route }) => ({
        headerTitle: "My Orders",
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
  </OrderStack.Navigator>
);

export default OrderNavigator;
