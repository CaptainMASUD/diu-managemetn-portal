import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-2xl font-semibold"
            >
              Daffodil International University
            </motion.h3>
            <p className="text-gray-400">
              Empowering students, educators, and staff with modern educational tools and technology.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg font-semibold"
            >
              Quick Links
            </motion.h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400">About Us</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-blue-400">Courses</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg font-semibold"
            >
              Connect with Us
            </motion.h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600">
                <FaFacebook size={30} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400">
                <FaTwitter size={30} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700">
                <FaLinkedin size={30} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600">
                <FaInstagram size={30} />
              </a>
              <a href="mailto:contact@daffodil.edu.bd" className="text-gray-400 hover:text-gray-100">
                <FaEnvelope size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-gray-400"
          >
            &copy; {new Date().getFullYear()} Daffodil International University. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
