import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import store from "./src/redux/store";

const App = () => {
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
