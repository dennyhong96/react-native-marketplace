import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  DELETE_PRODUCT,
} from "../actions/actionTypes";
import CartItem from "../../data/models/cartItem";

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  // Get a deep copy of the state
  const newState = JSON.parse(JSON.stringify(state));
  switch (type) {
    case ADD_TO_CART:
      if (newState.items[payload.id]) {
        // Hanlde increase quantity of item in cart
        newState.items[payload.id].title = payload.title;
        newState.items[payload.id].productPrice = payload.price;
        newState.items[payload.id].quantity++;
        newState.items[payload.id].sum += payload.price;
        newState.items[payload.id].pushToken = payload.pushToken;
      } else {
        // Handle add new item into cart
        newState.items[payload.id] = new CartItem(
          1,
          payload.price,
          payload.title,
          payload.pushToken,
          payload.price
        );
      }
      newState.totalAmount += payload.price;
      return newState;
    case REMOVE_FROM_CART:
      // Decrease total amount
      newState.totalAmount -= newState.items[payload].productPrice;
      if (newState.items[payload].quantity > 1) {
        // Handle decrease quantity
        newState.items[payload].sum -= newState.items[payload].productPrice;
        newState.items[payload].quantity--;
      } else {
        // Handle delete item
        delete newState.items[payload];
      }
      return newState;
    case CLEAR_CART:
      return INITIAL_STATE;
    case DELETE_PRODUCT:
      // Delete cart items when product is deleted
      if (!newState.items[payload]) {
        return state;
      }
      newState.totalAmount -=
        newState.items[payload].quantity * newState.items[payload].productPrice;
      delete newState.items[payload];
      return newState;
    default:
      return state;
  }
};
