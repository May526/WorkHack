import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "../hp/Login";

const PrivateRoute:React.FC<{component:React.FC,path:string}> = ({component,path}) => {
  const currentUser = useContext(AuthContext);

  return <Route path={path} component={currentUser ? component : Login} />;
};

export default PrivateRoute;
