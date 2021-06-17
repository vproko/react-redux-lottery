import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../store/actions/userActions";
import { registerAdmin } from "../store/async_actions/asyncAdminActions";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.user.token);
  const loading = useSelector(state => state.user.loading);
  const response = useSelector(state => state.user.message);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(clearMessage());
    const newAdmin = { firstName, lastName, username, password, confirmPassword, email, role: "Admin" };
    if (Object.values(newAdmin).some((x) => x === "") === true)
      return dispatch(setMessage("Don't leave empty fields"));
    dispatch(registerAdmin(token, newAdmin));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage())
    }
  }, [dispatch])

  return (
    <div className="mx-auto col-10 col-sm-8 col-md-6 col-lg-4">
      <form className="full-update-form">
        <div className="form-group">
          <label className="form-label" htmlFor="first-name">
            FIRST NAME
          </label>
          <input
            className="form-control"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="last-name">
            LAST NAME
          </label>
          <input
            className="form-control"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
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
        <div className="form-group">
          <label className="form-label" htmlFor="confirm-password">
            CONFIRM PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            EMAIL
          </label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            type="reset"
            className="btn btn-danger reset me-2"
            id="reset"
            onClick={reset}
          >
            RESET
          </button>
          <button
            type="submit"
            className="btn btn-success submit my-3"
            onClick={submit}
          >
            REGISTER
            {loading ? <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span> : null}
          </button>
        </div>
      </form>
      <div className="response text-center">{response}</div>
    </div>
  );
};

export default CreateAdmin;
