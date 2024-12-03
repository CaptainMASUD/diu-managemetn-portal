import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaUserGraduate, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!formData.role) {
      setMessage("Please select a role.");
      setAlertType("error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || "Registration successful!");
        setAlertType("success");
        // Navigate to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Delay to allow the success message to show
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Error registering. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://daffodilvarsity.edu.bd/template/images/social-share/diu-feature.jpg')", // Set the same background image as in the Login page
      }}
    >
      <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-filter backdrop-blur-lg shadow-lg w-96">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-6 text-center"
        >
          Register
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
                className="w-full p-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
                className="w-full p-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <FaUserGraduate className="absolute top-3 left-3 text-gray-400" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 pl-10 bg-white bg-opacity-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent appearance-none"
                required
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaUserCheck className="w-5 h-5" />
              </motion.div>
            ) : (
              <>
                <FaUserCheck className="mr-2" />
                Register
              </>
            )}
          </motion.button>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 text-center font-medium p-3 rounded-full ${
              alertType === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RegisterPage;
