import axios from "axios";

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  PRODUCTS_LISTED,
} from "./actionTypes";

export const createProduct = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://rn-shop-5c7c3.firebaseio.com/products.json",
      { ...formData, ownerId: "u1" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: CREATE_PRODUCT,
      payload: { ...formData, id: res.data.name },
    });
  } catch (error) {
    throw error;
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://rn-shop-5c7c3.firebaseio.com/products.json"
    );

    const productsList = res.data
      ? Object.keys(res.data).reduce(
          (acc, key) => [
            ...acc,
            {
              ...res.data[key],
              id: key,
              price: parseFloat(res.data[key].price),
            },
          ],
          []
        )
      : [];

    dispatch({
      type: PRODUCTS_LISTED,
      payload: productsList,
    });
  } catch (error) {
    throw error;
  }
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
