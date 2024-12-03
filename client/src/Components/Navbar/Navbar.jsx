import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../Redux/UserSlice/UserSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaSignOutAlt, FaHome, FaInfoCircle, FaBook, FaEnvelope, FaChevronDown, FaUserGraduate, FaChalkboardTeacher, FaUserCog } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Button } from "flowbite-react";

const AppNavbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/about", label: "About", icon: FaInfoCircle },
    { to: "/courses", label: "Courses", icon: FaBook, requiresAuth: true },
    { to: "/contact", label: "Contact", icon: FaEnvelope },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold tracking-wide">
              DIU Management Portal
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                (!item.requiresAuth || currentUser) && (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
                        isActive
                          ? "bg-pink-600 text-white"
                          : "text-white hover:bg-purple-500 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="mr-2" />
                    {item.label}
                  </NavLink>
                )
              ))}
            </div>
          </div>

          <div className="ml-4 flex items-center md:ml-6">
            {currentUser ? (
              <div className="relative">
                <motion.button
                  onClick={toggleDropdown}
                  className="flex items-center text-white hover:text-gray-200 focus:outline-none transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserCircle className="w-6 h-6 mr-2" />
                  <span className="mr-1">{currentUser.name}</span>
                  <FaChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 z-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.role}</p>
                      </div>
                      <Link
                        to={`/${currentUser.role}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {currentUser.role === "student" && <FaUserGraduate className="mr-2" />}
                        {currentUser.role === "teacher" && <FaChalkboardTeacher className="mr-2" />}
                        {currentUser.role === "admin" && <FaUserCog className="mr-2" />}
                        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Panel
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                        role="menuitem"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
              
                to="/login"
                className="inline-flex items-center  bg-transparent justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-purple-500 transition duration-300 ease-in-out transform "
              >
               <Button className="duration-500"
               gradientDuoTone="purpleToPink"
              
               >
               <FiLogIn className="mr-2 mt-1" /> Login
               </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
