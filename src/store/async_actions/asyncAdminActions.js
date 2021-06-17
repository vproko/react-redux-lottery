import { clearPrizes, clearSession, clearUsers, setPrizes, setSession, setUsers } from "../actions/adminActions";
import { clearLoading, setMessage } from "../actions/userActions";
import axios from "axios";
import { clearLoadingSetMessage, setLoadingCleanMessage } from "./asyncUserActions";

export const checkActiveSession = () => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .get(`http://localhost:54637/api/user/session/active`)
    .then((response) => {
      if (response !== {}) {
        setSessionClearLoading(dispatch, response.data);
      }
    })
    .catch((error) => {
      clearLoadingSetMessage(dispatch, error.response.data);
      dispatch(clearSession());
    });
};

export const startSession = (token) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/session`, null, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(clearSession());
      setSessionClearLoading(dispatch, response.data);
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const endSession = (token, sessionId) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/end?sessionId=${sessionId}`, null, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(clearSession());
      clearLoadingSetMessage(dispatch, response.data);
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const getPrizes = (token) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .get(`http://localhost:54637/api/admin/prizes`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(setPrizes(response.data));
      dispatch(clearLoading());
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const addPrize = (token, prize) => (dispatch) => {
  dispatch(clearPrizes());
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/prize/create`, prize, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(setMessage(response.data));
      dispatch(getPrizes(token));
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const updatePrize = (token, prize) => (dispatch) => {
  dispatch(clearPrizes());
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/prize/update`, prize, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(setMessage(response.data));
      dispatch(getPrizes(token));
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const deletePrize = (token, prizeId) => (dispatch) => {
  dispatch(clearPrizes());
  setLoadingCleanMessage(dispatch);
  axios
    .post(
      `http://localhost:54637/api/admin/prize/delete/?prizeId=${prizeId}`,
      null,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((response) => {
      dispatch(setMessage(response.data));
      dispatch(getPrizes(token));
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const sendDrawnNumbers = (token, draw) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/draw`, draw, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(setMessage(response.data));
      dispatch(checkActiveSession());
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const getUsersList = (token) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .get("http://localhost:54637/api/admin/users", {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => {
      dispatch(setUsers(response.data));
      dispatch(clearLoading());
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const deleteUserById = (token, userId, index, pageSize) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/delete/?userId=${userId}`, null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      dispatch(setMessage(response.data));
      dispatch(usersPerPage(token, index, pageSize));
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const registerAdmin = (token, admin) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .post(`http://localhost:54637/api/admin/register`, admin, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((response) => clearLoadingSetMessage(dispatch, response.data))
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

export const usersPerPage = (token, index = 1, pageSize = 5) => (dispatch) => {
  setLoadingCleanMessage(dispatch);
  axios
    .get(
      `http://localhost:54637/api/admin/users-per-page?index=${index}&pageSize=${pageSize}`,
      { headers: { Authorization: "Bearer " + token } }
    )
    .then((response) => {
      dispatch(clearUsers());
      dispatch(setUsers(response.data));
      dispatch(clearLoading());
    })
    .catch((error) => clearLoadingSetMessage(dispatch, error.response.data));
};

const setSessionClearLoading = (dispatch, session) => {
  dispatch(setSession(session));
  dispatch(clearLoading());
};
