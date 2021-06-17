import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/async_actions/asyncUserActions";

const Navbar = () => {
  const logged = useSelector((state) => state.user.logged);
  const administrator = useSelector((state) => state.admin.administrator);
  const dispatch = useDispatch();

  return (
    <div className="sticky-top">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand" id="brand" to="/">
              LO<sub>TT</sub>ERY
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {logged && administrator ? (
                  <NavLink to="/admin">ADMIN</NavLink>
                ) : null}
                {logged && !administrator ? <NavLink to="/ticket">TICKET</NavLink> : null}
                {logged ? <NavLink to="/profile">PROFILE</NavLink> : null}
                {!logged ? (
                  <NavLink to="/login">LOGIN</NavLink>
                ) : (
                  <NavLink className="logout" onClick={() => dispatch(logout())} to="/">
                    LOGOUT
                  </NavLink>
                )}
                {!logged ? (
                  <NavLink to="/registration">REGISTRATION</NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
