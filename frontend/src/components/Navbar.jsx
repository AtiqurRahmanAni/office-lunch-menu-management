import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import Button from "./Button";

const Navbar = () => {
  const location = useLocation();
  const { userInfo, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Lunch Management
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {!userInfo ? (
              [
                { title: "Login", href: "/login" },
                { title: "Sign Up", href: "/signup" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className={`block py-2 px-3 text-white rounded md:bg-transparent  md:p-0 ${
                      location.pathname === item.href
                        ? "md:text-blue-700"
                        : "md:text-gray-700"
                    }`}
                    aria-current="page"
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            ) : (
              <div>
                <span className="mr-3">Hi, {userInfo.displayName}</span>
                <Button
                  className="btn-danger"
                  onClick={() => onClick()}
                  loading={loading}
                >
                  Logout
                </Button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
