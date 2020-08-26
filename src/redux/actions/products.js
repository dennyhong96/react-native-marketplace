import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT } from "./actionTypes";

export const createProduct = (formData) => (dispatch) => {
  dispatch({
    type: CREATE_PRODUCT,
    payload: formData,
  });
};

export const editProduct = (id, formData) => (dispatch) => {
  dispatch({
    type: EDIT_PRODUCT,
    payload: {
      id,
      formData,
    },
  });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  });
};
