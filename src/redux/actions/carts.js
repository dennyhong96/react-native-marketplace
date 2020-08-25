import { ADD_TO_CART } from "./actionTypes";

export const addToCart = (product) => (dispatch) => {
  console.log(product);
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};
