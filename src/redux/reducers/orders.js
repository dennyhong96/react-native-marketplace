import { CREATE_ORDER } from "../actions/actionTypes";

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
    default:
      return state;
  }
};
