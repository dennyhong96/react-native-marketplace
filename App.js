import React from "react";
import { Provider } from "react-redux";

import ShopStack from "./src/navigators/ShopStack";

import store from "./src/redux/store";

const App = () => {
  return <ShopStack />;
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
