import { CREATE_ORDER } from "./actionTypes";

export const createOrder = (items, totalAmount) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER,
    payload: {
      items,
      totalAmount,
    },
  });
};
