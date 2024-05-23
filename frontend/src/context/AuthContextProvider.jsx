import React, { useState } from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
const info = {
  name: "Atiq",
};
export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const value = {
    userInfo,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
