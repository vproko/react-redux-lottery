import React from "react";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const logged = useSelector((state) => state.user.logged);
  const administrator = useSelector((state) => state.admin.administrator);
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        return logged && administrator ? (
          <Component {...props} />
        ) : (
          history.goBack()
        );
      }}
    />
  );
};

export default AdminRoute;
