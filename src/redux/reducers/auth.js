import { SIGNUP, SIGNIN } from "../actions/actionTypes";

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP:
      return state;
    default:
      return state;
  }
};
