import axios from "axios";
import { SIGNUP, SIGNIN, LOGOUT } from "./actionTypes";
import AsyncStorage from "@react-native-community/async-storage";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

let timer;

const startAuthSession = (expirationTime) => async (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const logout = () => async (dispatch) => {
  if (timer) {
    clearTimeout(timer);
  }
  await AsyncStorage.removeItem("IDENTITY");
  dispatch({
    type: LOGOUT,
  });
};

const saveIdentity = async (token, userId, expiresAt) => {
  await AsyncStorage.setItem(
    "IDENTITY",
    JSON.stringify({ token, userId, expiresAt })
  );
};

export const localSignin = () => async (dispatch) => {
  const userIdentity = await AsyncStorage.getItem("IDENTITY");
  if (userIdentity) {
    const userData = JSON.parse(userIdentity);
    if (
      new Date(userData.expiresAt).getTime() > new Date() &&
      userData.token &&
      userData.userId
    ) {
      dispatch({
        type: SIGNIN,
        payload: {
          idToken: userData.token,
          localId: userData.userId,
        },
      });
      dispatch(startAuthSession(userData.expiresAt - new Date().getTime()));
    }
  }
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

    const expirationDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    ).toISOString();
    await saveIdentity(res.data.idToken, res.data.localId, expirationDate);

    dispatch({
      type: SIGNUP,
      payload: res.data,
    });

    dispatch(startAuthSession(parseInt(res.data.expiresIn) * 1000));
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

    const expirationDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    ).toISOString();
    await saveIdentity(res.data.idToken, res.data.localId, expirationDate);

    dispatch({
      type: SIGNIN,
      payload: res.data,
    });

    dispatch(startAuthSession(parseInt(res.data.expiresIn) * 1000));
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
      throw new Error(`Acount not found with ${email}, please sign up.`);
    } else {
      throw new Error("Please try again.");
    }
  }
};
