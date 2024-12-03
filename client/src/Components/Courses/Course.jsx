import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBook, FaCalendarAlt, FaSpinner } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
        <FaSpinner className="animate-spin text-5xl text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6 text-center text-gray-800"
      >
        Available Courses
      </motion.h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600">No courses found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaBook className="text-purple-600 text-3xl mr-4" />
          <h3 className="text-2xl font-semibold text-gray-800">{course.course_name}</h3>
        </div>
        <p className="text-gray-600 mb-4 text-lg">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-2" />
          <span>
            {course.semester} {course.year}
          </span>
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-4 text-sm font-semibold text-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-600">
        Enroll Now
      </div>
    </motion.div>
  );
};

export default Courses;
