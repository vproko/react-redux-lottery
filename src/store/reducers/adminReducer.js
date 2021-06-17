import * as adminActions from "../actions/actionTypes";

const initialState = {
  administrator: false,
  users: {},
  session: {},
  prizes: [],
};

export const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case adminActions.setAdminTrue:
      return { ...state, administrator: true };
    case adminActions.setAdminFalse:
      return { ...state, administrator: false };
    case adminActions.setSession:
      return { ...state, session: Object.assign({}, payload) };
    case adminActions.clearSession:
      return { ...state, session: {} };
    case adminActions.setUsers:
      return { ...state, users: Object.assign({}, payload) };
    case adminActions.clearUsers:
      return { ...state, users: {} };
    case adminActions.setPrizes:
      return { ...state, prizes: [...payload] };
    case adminActions.clearPrizes:
      return { ...state, prizes: [] };
    default:
      return state;
  }
};
