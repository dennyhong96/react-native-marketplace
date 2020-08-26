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

export const editProduct = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `https://rn-shop-5c7c3.firebaseio.com/products/${id}.json`,
      { ...formData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: EDIT_PRODUCT,
      payload: {
        id,
        formData: res.data,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://rn-shop-5c7c3.firebaseio.com/products/${id}.json`
    );
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (error) {
    throw error;
  }
};
