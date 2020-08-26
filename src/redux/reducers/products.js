import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  PRODUCTS_LISTED,
} from "../actions/actionTypes";
import Product from "../../data/models/product";

const INITIAL_STATE = {
  availableProducts: [],
  userProducts: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LISTED:
      return {
        ...state,
        availableProducts: payload,
        userProducts: payload.filter((product) => product.owenerId === "u1"),
      };
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
      return {
        ...state,
        availableProducts: [
          ...state.availableProducts,
          new Product(
            payload.id,
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
            payload.id,
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
