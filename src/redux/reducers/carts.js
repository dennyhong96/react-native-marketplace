import { ADD_TO_CART } from "../actions/actionTypes";
import CartItem from "../../data/models/cartItem";

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      // Get a deep copy of the state
      const newState = JSON.parse(JSON.stringify(state));
      if (newState.items[payload.id]) {
        // Update quantity of item in cart
        newState.items[payload.id].title = payload.title;
        newState.items[payload.id].productPrice = payload.price;
        newState.items[payload.id].quantity++;
        newState.items[payload.id].sum += payload.price;
      } else {
        // Add new item into cart
        newState.items[payload.id] = new CartItem(
          1,
          payload.price,
          payload.title,
          payload.price
        );
      }
      newState.totalAmount += payload.price;
      return newState;
    default:
      return state;
  }
};
