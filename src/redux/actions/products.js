import axios from "axios";

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  PRODUCTS_LISTED,
} from "./actionTypes";

export const createProduct = (formData) => async (dispatch, getState) => {
  try {
    const { token, userId } = getState().auth;
    const res = await axios.post(
      `https://rn-shop-5c7c3.firebaseio.com/products.json?auth=${token}`,
      { ...formData, ownerId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: CREATE_PRODUCT,
      payload: { ...formData, id: res.data.name, ownerId: userId },
    });
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const listProducts = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId;
    const res = await axios.get(
      `https://rn-shop-5c7c3.firebaseio.com/products.json`
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
      payload: {
        productsList,
        ownerId: userId,
      },
    });
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const editProduct = (id, formData) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const res = await axios.patch(
      `https://rn-shop-5c7c3.firebaseio.com/products/${id}.json?auth=${token}`,
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
    console.log(error.response.data);
    throw error;
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    await axios.delete(
      `https://rn-shop-5c7c3.firebaseio.com/products/${id}.json?auth=${token}`
    );
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
