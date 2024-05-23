import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const PrivateRoute = () => {
  const { userInfo } = useAuthContext();

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
