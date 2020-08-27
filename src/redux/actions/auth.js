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
  } catch (error) {
    if (error.response.data.error.message === "EMAIL_EXISTS") {
      throw new Error(`Account with ${email} already exists.`);
    } else {
      throw new Error("Please try again.");
    }
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
  } catch (error) {
    if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
      throw new Error(`Acount not found with ${email}, please sign up.`);
    } else {
      throw new Error("Please try again.");
    }
  }
};
