import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("/users/whoami");
        setUserInfo(response.data);
        if (response.data.role === "admin") {
          navigate("/add-menu");
        } else {
          navigate("/choose-items");
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log("Here");
          setUserInfo(null);
          navigate("/login");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      toast.success(response.data.message);
      setUserInfo(null);
      navigate("/login");
    } catch (err) {
      if (err.response.status === 401) {
        setUserInfo(null);
      }
      toast.error(
        err.response ? err.response.data.message : "Something went wrong"
      );
    }
  };

  const value = {
    userInfo,
    setUserInfo,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};
