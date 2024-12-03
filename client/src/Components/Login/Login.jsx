import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { signInStart, signInSuccess, signInError } from "../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const LoginPage = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;

    if (!name || !password) {
      setAlertMessage("Both fields are required!");
      return;
    }

    dispatch(signInStart());

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(signInSuccess(result.user));
        setAlertMessage("Login successful!");
        navigate("/"); // Navigate to the home page after successful login
      } else {
        dispatch(signInError(result.message || "Login failed."));
        setAlertMessage(result.message || "Login failed.");
      }
    } catch (error) {
      dispatch(signInError("Error logging in."));
      setAlertMessage("Error logging in. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://daffodilvarsity.edu.bd/template/images/social-share/diu-feature.jpg')" }} // Set the background image
    >
      <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-filter backdrop-blur-lg shadow-lg w-96">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-6 text-center"
        >
          Login
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Username"
                required
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaSignInAlt className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Login
              </>
            )}
          </motion.button>
        </form>

        {alertMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 text-center font-medium p-3 rounded-full ${error ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}
          >
            {alertMessage}
          </motion.div>
        )}

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")} // Navigate to the register page
              className="text-blue-500 font-semibold"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
