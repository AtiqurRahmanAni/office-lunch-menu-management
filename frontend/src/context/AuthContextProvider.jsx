import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const { isLoading, data, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => axiosInstance.get("/users/whoami"),
    staleTime: Infinity,
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data.data);
    } else if (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [data, error]);

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      toast.success(response.data.message);
      setUserInfo(null);
      navigate("/login");
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Token expired");
        setUserInfo(null);
        navigate("/login");
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
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
};
