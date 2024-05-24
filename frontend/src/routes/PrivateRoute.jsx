import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useAuthContext();
  const location = useLocation();

  const pathName = location.pathname;

  if (userInfo) {
    if (
      userInfo.role === "employee" &&
      (pathName === "/add-menu" || pathName === "/view-choices")
    ) {
      return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
