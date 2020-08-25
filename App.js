import React, { useState } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import ShopStack from "./src/navigators/ShopStack";

import store from "./src/redux/store";

const loadFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={setFontsLoaded.bind(this, true)}
        onError={console.error}
      />
    );
  }

  return <ShopStack />;
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
