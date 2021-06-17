import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./hoc/AdminRoute";
import UserRoute from "./hoc/UserRoute";
import "./style.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Session from "./components/Session";
import Draw from "./components/Draw";
import Users from "./components/Users";
import Prizes from "./components/Prizes";
import CreateAdmin from "./components/CreateAdmin";
import Ticket from "./components/Ticket";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="container-fluid px-0">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <AdminRoute path="/admin" component={Admin} />
          <AdminRoute exact path="/admin/session" component={Session} />
          <AdminRoute exact path="/admin/draw" component={Draw} />
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute exact path="/admin/prizes" component={Prizes} />
          <AdminRoute exact path="/admin/create-admin" component={CreateAdmin} />
          <UserRoute exact path="/ticket" component={Ticket} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
