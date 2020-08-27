import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AppLoading } from "expo";

import { localSignin } from "../redux/actions/auth";
import MainDrawerNavigator from "./MainDrawer";
import AuthStackNavigator from "./Auth";

const Root = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);
  const [authLoaded, setAuthLoaded] = useState(false);

  const loadAuth = async () => {
    await dispatch(localSignin());
  };

  if (!authLoaded) {
    return (
      <AppLoading
        startAsync={loadAuth}
        onFinish={() => setAuthLoaded(true)}
        onError={console.log}
      />
    );
  }

  return (
    <NavigationContainer>
      {auth.userId ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Root;
