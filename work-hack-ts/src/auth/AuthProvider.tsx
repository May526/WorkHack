import React, { useEffect, useState, createContext } from "react";
import { app } from "../firebase_init";

export const AuthContext = createContext<firebase.default.User|null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser as any);
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
