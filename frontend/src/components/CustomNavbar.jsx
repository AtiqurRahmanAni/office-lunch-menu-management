import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { Avatar, Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";

const CustomNavbar = () => {
  const { userInfo, logout } = useAuthContext();

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <Navbar fluid rounded className="container">
        <Navbar.Brand>
          <img
            src="/src/assets/spoons.png"
            className="mr-3 h-6 sm:h-9"
            alt="Spoons"
          />
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
              <div>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt="User avatar"
                      img="/src/assets/avatar.png"
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {userInfo.displayName}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {userInfo.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
