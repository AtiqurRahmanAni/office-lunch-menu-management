import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";

const CustomNavbar = () => {
  const { userInfo, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <Navbar fluid rounded className="container">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Lunch Management
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!userInfo ? (
            [
              { title: "Login", href: "/login" },
              { title: "Sign Up", href: "/signup" },
            ].map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `block py-2 px-3 text-white rounded md:bg-transparent md:p-0 ${
                      isActive ? "md:text-blue-700" : "md:text-gray-700"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))
          ) : (
            <div className="flex items-center">
              {userInfo.role === "admin" && (
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white mr-4">
                  {[
                    { title: "Choose", href: "/choose-items" },
                    { title: "Add Menu", href: "/add-menu" },
                    { title: "View Choices", href: "/view-choices" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block py-2 px-3 text-white rounded md:bg-transparent md:p-0 ${
                            isActive ? "md:text-blue-700" : "md:text-gray-700"
                          }`
                        }
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
              <Button
                color="red"
                onClick={() => onClick()}
                isProcessing={loading}
              >
                Logout
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
