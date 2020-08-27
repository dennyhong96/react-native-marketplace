import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainDrawerNavigator from "./MainDrawer";
import AuthStackNavigator from "./Auth";

const Root = () => {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
      {/* <MainDrawerNavigator /> */}
    </NavigationContainer>
  );
};

export default Root;
