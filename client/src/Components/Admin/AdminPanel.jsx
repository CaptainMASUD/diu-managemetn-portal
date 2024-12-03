import React, { useState } from "react";
import { FaBook, FaUserTie, FaUsers, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";
import AddCourseForm from "./AddCourseForm";
import AssignAdvisorForm from "./AssignAdvisorForm";
import ShowStudents from "./ShowStudents";
import ShowTeachers from "./ShowTeachers";
import ShowCourses from "./ShowCourses";
import ShowAdvisorAssignments from "./ShowAdvisorAssignments";
import AssignCourseToTeacher from "./AssignCourseToTeacher"; // Import AssignCourseToTeacher component
import ViewAssignedCourses from "./ViewAssignedCourses"; // Import ViewAssignedCourses component
import Statistics from "./Statistics";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("viewStatistics"); // Set "viewStatistics" as the default active tab

  // Define animation variants for each tab transition
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <div className="space-y-4">
          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full mb-3 ${activeTab === "viewStatistics" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("viewStatistics")}
          >
            <FaClipboardList className="mr-2" />
            View Statistics
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "addCourse" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("addCourse")}
          >
            <FaBook className="mr-2" />
            Add Course
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "assignAdvisor" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("assignAdvisor")}
          >
            <FaUserTie className="mr-2" />
            Assign Advisor
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "showStudents" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showStudents")}
          >
            <FaUsers className="mr-2" />
            Show Students
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "showTeachers" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showTeachers")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Show Teachers
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "showCourses" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showCourses")}
          >
            <FaClipboardList className="mr-2" />
            Show Courses
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "showAdvisorAssignments" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showAdvisorAssignments")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Show Advisor Assignments
          </button>

          {/* New tabs for Assigning Courses to Teacher and Viewing Assigned Courses */}
          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "assignCourseToTeacher" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("assignCourseToTeacher")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Assign Course to Teacher
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-md w-full ${activeTab === "viewAssignedCourses" ? "bg-gradient-to-r from-purple-600  to-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("viewAssignedCourses")}
          >
            <FaClipboardList className="mr-2" />
            View Assigned Courses
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Add Framer Motion container to wrap the content */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabVariants}  // Apply animation variants here
          transition={{ duration: 0.5 }}
        >
          {/* Tab Content */}
          {activeTab === "addCourse" && <AddCourseForm />}
          {activeTab === "assignAdvisor" && <AssignAdvisorForm />}
          {activeTab === "showStudents" && <ShowStudents />}
          {activeTab === "showTeachers" && <ShowTeachers />}
          {activeTab === "showCourses" && <ShowCourses />}
          {activeTab === "showAdvisorAssignments" && <ShowAdvisorAssignments />}
          {activeTab === "assignCourseToTeacher" && <AssignCourseToTeacher />}
          {activeTab === "viewAssignedCourses" && <ViewAssignedCourses />}
          {activeTab === "viewStatistics" && <Statistics />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
