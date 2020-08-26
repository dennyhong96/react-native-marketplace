import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
} from "../actions/actionTypes";
import Product from "../../data/models/product";

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== payload
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== payload
        ),
      };
    case CREATE_PRODUCT:
      const id = `${Math.random() * 99999}`;
      return {
        ...state,
        availableProducts: [
          ...state.availableProducts,
          new Product(
            id,
            "u1",
            payload.title,
            payload.imageUrl,
            payload.description,
            Number(payload.price)
          ),
        ],
        userProducts: [
          ...state.userProducts,
          new Product(
            id,
            "u1",
            payload.title,
            payload.imageUrl,
            payload.description,
            Number(payload.price)
          ),
        ],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.map((product) =>
          product.id === payload.id
            ? {
                ...product,
                ...payload.formData,
                price: Number(payload.formData.price),
              }
            : product
        ),
        userProducts: state.userProducts.map((product) =>
          product.id === payload.id
            ? {
                ...product,
                ...payload.formData,
                price: Number(payload.formData.price),
              }
            : product
        ),
      };
    default:
      return state;
  }
};
