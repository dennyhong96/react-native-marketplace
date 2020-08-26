import axios from "axios";

import { CREATE_ORDER, ORDER_LISTED } from "./actionTypes";
import { clearCart } from "./carts";
import Order from "../../data/models/order";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const listOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://rn-shop-5c7c3.firebaseio.com/orders/u1.json"
    );

    const orders = res.data
      ? Object.keys(res.data).reduce(
          (acc, key) => [
            ...acc,
            new Order(
              key,
              res.data[key].items,
              res.data[key].totalAmount,
              res.data[key].date
            ),
          ],
          []
        )
      : [];

    dispatch({
      type: ORDER_LISTED,
      payload: orders,
    });
  } catch (error) {
    throw error;
  }
};

export const createOrder = (items, totalAmount) => async (dispatch) => {
  const payload = {
    items,
    totalAmount,
    date: new Date().toISOString(),
  };
  try {
    const res = await axios.post(
      "https://rn-shop-5c7c3.firebaseio.com/orders/u1.json",
      payload,
      config
    );

    dispatch({
      type: CREATE_ORDER,
      payload: {
        ...payload,
        id: res.data.name,
      },
    });
    dispatch(clearCart());
  } catch (error) {
    throw error;
  }
};
