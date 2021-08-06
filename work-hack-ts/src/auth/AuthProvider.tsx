import React, { useEffect, useState, createContext } from "react";
import { app } from "../firebase_init";
import { History } from "history";

export const AuthContext = createContext("");

export const AuthProvider:React.FC = ({ children  }) => {
  const [currentUser, setCurrentUser] = useState(null);


  /**
   * ユーザーをログインさせる関数
   * @param {string} email
   * @param {string} password
   * @param {History} history
   */
  const login = async (email:string, password:string, history:History) => {
    try {
      const user_cred = await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/app");
      return user_cred.user
      
    } catch (error) {
      alert(error);
    }
  };
  /**
   * 新しいユーザーを作成しログインさせる関数
   * @param {string} email
   * @param {string} password
   * @param {History} history
   */
  const signup = async (email:string, password:string, history:History) => {
    try {
      const user_cred = await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/app");
      return user_cred.user
    } catch (error) {
      alert(error);
    }
  };

  /**
   * 現在ログイン中ののユーザーをログアウトさせる関数
   * @returns 不明
   */
  const logout = () => app.auth().signOut();

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser as any);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        currentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
