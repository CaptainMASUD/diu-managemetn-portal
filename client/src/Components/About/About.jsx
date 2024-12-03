import React from "react";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";
import { FaRegBuilding, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-8"
          >
            About Daffodil International University Management Portal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-700 text-center mb-8"
          >
            The **Daffodil International University Management Portal System** is a comprehensive online platform designed
            to streamline and simplify various administrative processes at the university. This system aims to empower
            students, faculty, and management through efficient tools for managing courses, student data, assignments,
            attendance, and communication.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaRegBuilding className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">University Management</h3>
              <p>Streamline administrative tasks, manage data, and track university-wide performance.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaUsers className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Management</h3>
              <p>Efficiently manage student data, registration, attendance, and academic progress.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaChalkboardTeacher className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Course Management</h3>
              <p>Create, manage, and track courses with a complete set of administrative tools.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-xl text-gray-700">
              Our mission is to provide a seamless and intuitive experience for students, faculty, and administrative
              staff by offering modern technological solutions for academic and administrative management.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
