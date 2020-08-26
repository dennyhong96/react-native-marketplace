import { DELETE_PRODUCT } from "./actionTypes";

export const deleteProduct = (id) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
};
