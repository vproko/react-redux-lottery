import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../store/actions/userActions";
import { updateUserData } from "../store/async_actions/asyncUserActions";

const Profile = () => {
  const token = useSelector(state => state.user.user.token);
  const userId = useSelector(state => state.user.user.userId);
  const loading = useSelector((state) => state.user.loading);
  const response = useSelector((state) => state.user.message);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");

  const hasDuplicates = () => {
    return new Promise((resolve) => {
      const inputs = document.querySelectorAll("input");
      const values = [];
      let check;
      for (const input of inputs) {
        if(input.value !== "") values.push(input.value);
      }
      if (values.length < 6) check = true;
      resolve(check);
    });
  };

  const update = async (e) => {
    e.preventDefault();
    const check = await hasDuplicates();
    if (check) return dispatch(setMessage("Don't leave empty fields"));
    dispatch(
      updateUserData({
        userId,
        firstName,
        lastName,
        oldPassword,
        newPassword,
        confirmedPassword,
        email,
        token,
      })
    );
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setOldPassword("");
    setNewPassword("");
    setConfirmedPassword("");
    setEmail("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto col-10 col-sm-8 col-md-6 col-lg-4">
      <form className="full-form">
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
          <label className="form-label" htmlFor="old-password">
            OLD PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="new-password">
            NEW PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="confirmed-password">
            CONFIRM PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
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
            onClick={update}
          >
            CHANGE
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
          </button>
        </div>
      </form>
      {response ? <div className="response text-center">{response}</div> : null}
    </div>
  );
};

export default Profile;
