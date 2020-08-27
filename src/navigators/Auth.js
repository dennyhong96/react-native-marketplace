import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../screens/user/AuthScreen";

const AuthStack = createStackNavigator();

export default () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Auth" component={AuthScreen} />
  </AuthStack.Navigator>
);
