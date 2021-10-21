import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "../hp/Login";
import { app } from "../firebase_init";

const PrivateRoute: React.FC<{ component: React.FC; path: string }> = ({
  component,
  path,
}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [auth_is_checked, setAuthIsChecked] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }

      setAuthIsChecked(true);
    });
  }, [setCurrentUser]);

  return (
    <Route
      path={path}
      component={
        auth_is_checked
          ? currentUser
            ? component
            : Login
          : () => (
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "larger" }}>loading...</div>
                </div>
              </div>
            )
      }
    />
  );
};

export default PrivateRoute;
