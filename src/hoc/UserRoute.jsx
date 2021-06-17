import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const UserRoute = ({ component: Component, rest }) => {
  const administrator = useSelector((state) => state.admin.administrator);
  const logged = useSelector((state) => state.user.logged);
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        return logged && !administrator ? (
          <Component {...props} />
        ) : (
          history.goBack()
        );
      }}
    />
  );
};

export default UserRoute;
