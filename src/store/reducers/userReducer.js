import * as userActions from "../actions/actionTypes";

const initialState = {
  logged: false,
  user: {},
  message: "",
  loading: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActions.setUserData:
      return { ...state, user: payload };
    case userActions.clearUserData:
      return { ...state, user: {} };
    case userActions.setLogged:
      return { ...state, logged: true };
    case userActions.clearLogged:
      return { ...state, logged: false };
    case userActions.setMessage:
      return { ...state, message: payload };
    case userActions.clearMessage:
      return { ...state, message: "" };
    case userActions.setLoading:
      return { ...state, loading: true };
    case userActions.clearLoading:
      return { ...state, loading: false };
    default:
      return state;
  }
};
