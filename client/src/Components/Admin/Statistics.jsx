import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";  // Import Framer Motion for animations
import { FaUsers, FaChalkboardTeacher, FaBook, FaLayerGroup, FaClipboardList } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi"; // Additional icons for variety
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Helper function to format large numbers with commas
const formatNumber = (num) => {
  return num ? new Intl.NumberFormat().format(num) : "0";
};

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch statistics data from the backend
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/statistics/get-stats'); // Adjust URL as necessary
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading statistics...</div>;
  }

  // Define card colors
  const cardColors = {
    users: '#4e73df',  // blue
    students: '#28a745', // green
    teachers: '#fbc02d', // yellow
    courses: '#9c27b0', // purple
    advisedTeachers: '#26c6da', // teal
    teacherCourses: '#f44336', // red
    courseRegistrations: '#3f51b5', // indigo
  };

  // Prepare chart data for the vertical bar chart
  const chartData = {
    labels: [
      'Users', 'Students', 'Teachers', 'Courses', 'Advised Teachers', 'Teacher Courses', 'Course Registrations'
    ],
    datasets: [
      {
        label: 'Statistics',
        data: [
          stats.total_users,
          stats.total_students,
          stats.total_teachers,
          stats.total_courses,
          stats.total_advised_teachers,
          stats.total_teacher_courses,
          stats.total_course_registrations
        ],
        backgroundColor: [
          cardColors.users,
          cardColors.students,
          cardColors.teachers,
          cardColors.courses,
          cardColors.advisedTeachers,
          cardColors.teacherCourses,
          cardColors.courseRegistrations
        ],
        borderColor: [
          cardColors.users,
          cardColors.students,
          cardColors.teachers,
          cardColors.courses,
          cardColors.advisedTeachers,
          cardColors.teacherCourses,
          cardColors.courseRegistrations
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for vertical bar graph with animations
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1500, // 1.5 seconds for the animation
      easing: 'easeInOutQuad', // Smooth animation easing
    },
    plugins: {
      title: {
        display: true,
        text: 'System Statistics Overview',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* System Statistics Cards */}
      <motion.h2
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        System Statistics
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-blue-500 mr-4">
            <FaUsers className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="font-bold text-blue-700">{formatNumber(stats.total_users)}</p>
          </div>
        </motion.div>

        {/* Total Students Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="text-green-500 mr-4">
            <FaBook className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Students</h3>
            <p className="font-bold text-green-700">{formatNumber(stats.total_students)}</p>
          </div>
        </motion.div>

        {/* Total Teachers Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-yellow-500 mr-4">
            <FaChalkboardTeacher className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Teachers</h3>
            <p className="font-bold text-yellow-700">{formatNumber(stats.total_teachers)}</p>
          </div>
        </motion.div>

        {/* Total Courses Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="text-purple-500 mr-4">
            <FaLayerGroup className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Courses</h3>
            <p className="font-bold text-purple-700">{formatNumber(stats.total_courses)}</p>
          </div>
        </motion.div>

        {/* Total Advised Teachers Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="text-teal-500 mr-4">
            <GiTeacher className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Advised Teachers</h3>
            <p className="font-bold text-teal-700">{formatNumber(stats.total_advised_teachers)}</p>
          </div>
        </motion.div>

        {/* Total Teacher Courses Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-red-500 mr-4">
            <FaClipboardList className="text-4xl" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Total Teacher Courses</h3>
            <p className="font-bold text-red-700">{formatNumber(stats.total_teacher_courses)}</p>
          </div>
        </motion.div>
      </div>

      {/* Chart Section with Framer Motion for Animation */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4">System Statistics Graph</h3>
        <Bar data={chartData} options={chartOptions} />
      </motion.div>

      {/* Course Enrollment Details */}
      <motion.h3
        className="text-2xl font-semibold mt-8 mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Course Enrollment Details
      </motion.h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Courses and Student Enrollment</h3>
        <ul>
          {stats.course_student_counts.slice(0, 5).map((course) => ( // Limit to 5 courses
            <motion.li
              key={course.course_id}
              className="flex justify-between py-3 border-b"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <span>{course.course_name}</span>
              <span>{formatNumber(course.student_count)} students enrolled</span>
            </motion.li>
          ))}
        </ul>
        {stats.course_student_counts.length > 5 && (
          <div className="text-center text-blue-500 mt-4">
            <button className="font-semibold">View More Courses</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Statistics;
