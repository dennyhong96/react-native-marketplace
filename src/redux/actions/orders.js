import axios from "axios";

import { CREATE_ORDER } from "./actionTypes";
import { clearCart } from "./carts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
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
