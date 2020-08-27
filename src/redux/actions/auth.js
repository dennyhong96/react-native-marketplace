import axios from "axios";
import { SIGNUP, SIGNIN } from "./actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signup = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQAJJaxOQWfudO6eu19-LEpoz7dmsO0Lw`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      config
    );

    dispatch({
      type: SIGNUP,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signin = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQAJJaxOQWfudO6eu19-LEpoz7dmsO0Lw`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      config
    );

    dispatch({
      type: SIGNIN,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    throw error;
  }
};
