import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./actionTypes";

export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};

export const clearCart = (id) => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
