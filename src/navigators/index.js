import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import MainDrawerNavigator from "./MainDrawer";

const Root = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default Root;
