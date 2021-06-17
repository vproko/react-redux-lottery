import React from "react";
import { Switch, useRouteMatch, NavLink } from "react-router-dom";
import AdminRoute from "../hoc/AdminRoute";

import Session from "./Session";
import Draw from "./Draw";
import Users from "./Users";
import Prizes from "./Prizes";
import CreateAdmin from "./CreateAdmin";

const Admin = () => {
  const {path, url} = useRouteMatch();

  return (
    <div className="container-fluid">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link" exact to={`${url}`}>SESSION</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`${url}/draw`}>DRAW</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`${url}/users`}>USERS</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`${url}/prizes`}>PRIZES</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`${url}/create-admin`}>CREATE ADMIN</NavLink>
        </li>
      </ul>
      <Switch>
        <AdminRoute exact path={`${path}`} component={Session} />
        <AdminRoute path={`${path}/draw`} component={Draw} />
        <AdminRoute path={`${path}/users`} component={Users} />
        <AdminRoute path={`${path}/prizes`} component={Prizes} />
        <AdminRoute path={`${path}/create-admin`} component={CreateAdmin} />
      </Switch>
    </div>
  );
};

export default Admin;
