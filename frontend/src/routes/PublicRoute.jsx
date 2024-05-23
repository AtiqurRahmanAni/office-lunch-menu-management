import React from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  const { userInfo } = useAuthContext();

  return userInfo ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
