import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/actionTypes";

const INITIAL_STATE = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PRODUCT:
      return {
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== payload
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== payload
        ),
      };
    default:
      return state;
  }
};
