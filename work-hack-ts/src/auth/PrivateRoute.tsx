import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "../hp/Login";

const PrivateRoute = ({ component, ...options }:any) => {
  const { currentUser } :any = useContext(AuthContext);

  return <Route {...options} component={currentUser ? component : Login} />;
};

export default PrivateRoute;
