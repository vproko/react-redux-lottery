export const setUserData = (user) => {
  return {
    type: "SET_USER_DATA",
    payload: user,
  };
};

export const clearUserData = () => {
  return {
    type: "CLEAR_USER_DATA",
  };
};

export const setLogged = () => {
  return {
    type: "SET_LOGGED",
  };
};

export const clearLogged = () => {
  return {
    type: "CLEAR_LOGGED",
  };
};

export const setMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  };
};

export const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};

export const clearLoading = () => {
  return {
    type: "CLEAR_LOADING",
  };
};
