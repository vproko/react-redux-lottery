import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { adminReducer } from "./store/reducers/adminReducer";
import { userReducer } from "./store/reducers/userReducer";
import thunk from "redux-thunk";

import App from "./App";

const store = createStore(
  combineReducers({ admin: adminReducer, user: userReducer }),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
