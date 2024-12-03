import React from "react";
import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBookOpen, FaChalkboardTeacher, FaBullhorn, FaUsers } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Hero Section (Flowbite Carousel) */}
      <section className="relative h-[400px]">
        <Carousel>
          <div className="relative w-full h-full">
            <img
              src="https://media.licdn.com/dms/image/v2/C561BAQGDfHTOp4ZSOQ/company-background_10000/company-background_10000/0/1600930185395/daffodil_international_university_cover?e=2147483647&v=beta&t=oIIhgfb2CnMiaJtueo0hkKT6Ew0_hvQ8u1y3YB-XdME"
              alt="Slide 1"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Transform Your Learning Experience
              </motion.h2>
            </div>
          </div>

          <div className="relative w-full h-full">
            <img
              src="https://studentshub.daffodilvarsity.edu.bd/assets/img/about/1719679319.jpeg"
              alt="Slide 2"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Empowering Educators to Teach Better
              </motion.h2>
            </div>
          </div>

          <div className="relative w-full h-full">
            <img
              src="https://i.ytimg.com/vi/FkLZ3xs-V5w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4eGrAT_Qe88pQKnG3a6OgVYgzXg"
              alt="Slide 3"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Join a Growing Community of Learners
              </motion.h2>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-semibold mb-12"
          >
            Our Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaGraduationCap className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Dashboard</h3>
              <p>Manage your courses, assignments, and track your progress in one place.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaBookOpen className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Course Management</h3>
              <p>Efficient tools to create and manage your courses and materials.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FaChalkboardTeacher className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teacher Dashboard</h3>
              <p>View your classes, students, assignments, and track performance.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-semibold mb-4"
        >
          Join Us Today
        </motion.h2>
        <p className="text-xl mb-8">Experience a seamless and modern educational environment.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-500 text-white py-2 px-8 rounded-lg font-semibold"
        >
          Get Started
        </motion.button>
      </section>
    </div>
  );
};

export default HomePage;
