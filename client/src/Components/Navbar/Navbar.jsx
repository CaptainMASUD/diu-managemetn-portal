import React from "react";
import { Dropdown, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../Redux/UserSlice/UserSlice"; // Ensure signOut action is set in your redux slice
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Corrected icons
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const { currentUser } = useSelector((state) => state.user); // Get current user from redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <Navbar fluid={true} className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <Navbar.Brand href="/" className="text-white text-2xl font-semibold tracking-wide">
        DIU Management Portal
      </Navbar.Brand>

      {/* Centered navigation items */}
      <div className="flex justify-center flex-1">
        <NavLink
          to="/"
          exact
          className="text-white text-sm px-4 py-2 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          activeClassName="bg-blue-500 text-white font-semibold"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="text-white text-sm px-4 py-2 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          activeClassName="bg-blue-500 text-white font-semibold"
        >
          About
        </NavLink>
        {/* Conditional Course Link */}
        {currentUser && (
          <NavLink
            to="/courses"
            className="text-white text-sm px-4 py-2 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
            activeClassName="bg-blue-500 text-white font-semibold"
          >
            Courses
          </NavLink>
        )}
        <NavLink
          to="/contact"
          className="text-white text-sm px-4 py-2 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          activeClassName="bg-blue-500 text-white font-semibold"
        >
          Contact
        </NavLink>
      </div>

      {/* Right side of the navbar */}
      <div className="flex md:order-2">
        {currentUser ? (
          <Dropdown
            inline
            label={
              <div className="flex items-center space-x-2 text-white">
                <FaUserCircle className="w-8 h-8" />
                <span>{currentUser.name}</span>
              </div>
            }
          >
            {/* Dropdown content */}
            <Dropdown.Item className="text-gray-700">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.role}</p>
            </Dropdown.Item>

            {/* Conditional Panel Links based on the role */}
            <Dropdown.Item>
              <Link
                to={`/${currentUser.role}`}
                className="text-gray-700 block px-4 py-2"
              >
                {currentUser.role === "student" && "Student Panel"}
                {currentUser.role === "teacher" && "Teacher Panel"}
                {currentUser.role === "admin" && "Admin Panel"}
              </Link>
            </Dropdown.Item>

            {/* Logout Button */}
            <Dropdown.Item onClick={handleLogout} className="text-red-600">
              <div className="flex items-center">
                <FaSignOutAlt className="mr-2 w-5 h-5" />
                Logout
              </div>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="text-white text-sm px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          >
            Login
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default AppNavbar;
