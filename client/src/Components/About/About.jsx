import React from "react";
import { motion } from "framer-motion";
import { FaRegBuilding, FaUsers, FaChalkboardTeacher, FaLaptop, FaRegLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="font-sans bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-semibold text-center mb-8 text-gray-800"
          >
            About Daffodil International University Management Portal
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          >
            The Daffodil International University Management Portal System is a comprehensive online platform designed
            to streamline and simplify various administrative processes at the university. This system empowers students, faculty,
            and management through efficient tools for managing courses, student data, assignments, attendance, and communication.
          </motion.p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <FaRegBuilding className="text-5xl text-gradient mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">University Management</h3>
              <p className="text-gray-600 text-center">Streamline administrative tasks, manage data, and track university-wide performance.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <FaUsers className="text-5xl text-gradient mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Student Management</h3>
              <p className="text-gray-600 text-center">Efficiently manage student data, registration, attendance, and academic progress.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <FaChalkboardTeacher className="text-5xl text-gradient mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Course Management</h3>
              <p className="text-gray-600 text-center">Create, manage, and track courses with a complete set of administrative tools.</p>
            </motion.div>

          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our mission is to provide a seamless and intuitive experience for students, faculty, and administrative
              staff by offering modern technological solutions for academic and administrative management.
            </p>
          </motion.div>

          {/* Key Stats */}
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">Key Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="p-8 bg-white rounded-lg shadow-lg"
                >
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">500+</h4>
                  <p className="text-gray-600">Active Students</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="p-8 bg-white rounded-lg shadow-lg"
                >
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">50+</h4>
                  <p className="text-gray-600">Experienced Faculty</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="p-8 bg-white rounded-lg shadow-lg"
                >
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">100+</h4>
                  <p className="text-gray-600">Courses Available</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800">What Our Users Say</h3>
              <div className="flex justify-center space-x-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-md"
                >
                  <FaRegLightbulb className="text-5xl text-blue-600 mb-4 mx-auto" />
                  <p className="text-lg text-gray-600 italic mb-4">
                    "The portal has transformed the way I manage my courses and stay on top of my assignments."
                  </p>
                  <p className="text-sm text-gray-500 text-center">- John Doe, Student</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-md"
                >
                  <FaRegLightbulb className="text-5xl text-blue-600 mb-4 mx-auto" />
                  <p className="text-lg text-gray-600 italic mb-4">
                    "As a faculty member, the platform has made it easier to track my students' progress and provide feedback."
                  </p>
                  <p className="text-sm text-gray-500 text-center">- Jane Smith, Faculty</p>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
