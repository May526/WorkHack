import React, { useEffect, useState, createContext } from "react";
import { app } from "../firebase_init";

export const AuthContext = createContext<{
  currentUser: firebase.default.User | null;
  setCurrentUser: (user: firebase.default.User | null) => any;
}>({ currentUser: null ,setCurrentUser:()=>{}});

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(
    null
  );
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
