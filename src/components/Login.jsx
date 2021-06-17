import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { setAdminTrue } from "../store/actions/adminActions";
import { checkActiveSession, getPrizes, usersPerPage } from "../store/async_actions/asyncAdminActions";
import { setLogged, setMessage, setUserData, clearLoading, clearMessage, setLoading } from "../store/actions/userActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const response = useSelector(state => state.user.message);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    dispatch(clearMessage());
    if (username === "" || password === "")
      return dispatch(setMessage("Don't leave empty fields"));
    dispatch(setLoading());
    axios
      .post(`http://localhost:54637/api/user/authenticate`, { username, password })
      .then((response) => {
        dispatch(setLogged());
        dispatch(setUserData(response.data));
        dispatch(checkActiveSession());
        if (response.data.role === "Admin") {
          dispatch(setAdminTrue());
          dispatch(usersPerPage(response.data.token));
          dispatch(getPrizes(response.data.token));
          history.push("/admin");
        }
        if (response.data.role === "User") {
          dispatch(clearLoading());
          history.push("ticket");
        }
      })
      .catch((error) => {
        dispatch(clearLoading());
        dispatch(setMessage(error.response.data))
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage())
    }
  }, [dispatch])

  return (
    <div className="container-fluid">
      <div className="mx-auto col-10 col-sm-8 col-md-6 col-lg-4">
        <form className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success submit my-3"
            onClick={login}
          >
            LOGIN
            {loading ? <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span> : null}
          </button>
        </form>
        <br />
        <div className="response text-center">{response}</div>
      </div>
    </div>
  );
};

export default Login;
