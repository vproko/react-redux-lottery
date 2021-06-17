export const setAdminTrue = () => {
  return {
    type: "SET_ADMIN_TRUE",
    payload: true,
  };
};

export const setAdminFalse = () => {
  return {
    type: "SET_ADMIN_FALSE",
    payload: false,
  };
};

export const setSession = (session) => {
  return {
    type: "SET_SESSION",
    payload: session,
  };
};

export const clearSession = () => {
  return {
    type: "CLEAR_SESSION",
  };
};

export const setUsers = (users) => {
  return {
    type: "SET_USERS",
    payload: users,
  };
};

export const clearUsers = () => {
  return {
    type: "CLEAR_USERS",
  };
};

export const setPrizes = (prizes) => {
  return {
    type: "SET_PRIZES",
    payload: prizes,
  };
};

export const clearPrizes = () => {
  return {
    type: "CLEAR_PRIZES",
  };
};
