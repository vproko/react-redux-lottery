import axios from "axios";
import { clearPrizes, clearSession, clearUsers, setAdminFalse } from "../actions/adminActions";
import { clearLoading, clearLogged, clearMessage, clearUserData, setLoading, setMessage, setUserData } from "../actions/userActions";

export const registerUser = (newUser) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/user/register`, newUser)
    .then((response) => clearLoadingSetMessage(dispatch, response.data))
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const checkNumbers = (numbers) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/user/check?numbers=${numbers}`)
    .then((response) =>
      clearLoadingSetMessage(
        dispatch,
        `Winning numbers: "${response.data.winningNumbers}" You won: ${response.data.prize} Congratulations!`
      )
    )
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const sendTicket = (token, ticket) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/user/ticket`, ticket, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => clearLoadingSetMessage(dispatch, response.data))
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const updateUserData = (data) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/user/update`, data, {
      headers: { Authorization: "Bearer " + data.token },
    })
    .then((response) => {
      dispatch(setUserData(response.data));
      clearLoadingSetMessage(dispatch, "Your profile has been successfully updated.");
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const logout = () => (dispatch) => {
  dispatch(setAdminFalse());
  dispatch(clearSession());
  dispatch(clearUsers());
  dispatch(clearPrizes());
  dispatch(clearUserData());
  dispatch(clearLogged());
  dispatch(clearMessage());
  dispatch(clearLoading());
};

export const setLoadingCleanMessage = (dispatch) => {
  dispatch(setLoading());
  dispatch(clearMessage());
};

export const clearLoadingSetMessage = (dispatch, message) => {
  dispatch(setMessage(message));
  dispatch(clearLoading());
};
