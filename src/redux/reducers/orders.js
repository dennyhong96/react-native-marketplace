import { CREATE_ORDER, ORDER_LISTED } from "../actions/actionTypes";

import Order from "../../data/models/order";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER:
      return [
        ...state,
        new Order(payload.id, payload.items, payload.totalAmount, payload.date),
      ];
    case ORDER_LISTED:
      return payload;
    default:
      return state;
  }
};
