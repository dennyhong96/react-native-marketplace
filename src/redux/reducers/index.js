import { combineReducers } from "redux";

import products from "./products";
import carts from "./carts";
import orders from "./orders";

export default combineReducers({ products, carts, orders });
