import { CREATE_ORDER } from "./actionTypes";

import { clearCart } from "./carts";

export const createOrder = (items, totalAmount) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER,
    payload: {
      items,
      totalAmount,
    },
  });
  dispatch(clearCart());
};
