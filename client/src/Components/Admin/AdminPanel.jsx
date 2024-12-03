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

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("addCourse");

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <div className="space-y-4">
          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "addCourse" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("addCourse")}
          >
            <FaBook className="mr-2" />
            Add Course
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "assignAdvisor" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("assignAdvisor")}
          >
            <FaUserTie className="mr-2" />
            Assign Advisor
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "showStudents" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showStudents")}
          >
            <FaUsers className="mr-2" />
            Show Students
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "showTeachers" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showTeachers")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Show Teachers
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "showCourses" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showCourses")}
          >
            <FaClipboardList className="mr-2" />
            Show Courses
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "showAdvisorAssignments" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("showAdvisorAssignments")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Show Advisor Assignments
          </button>

          {/* New tabs for Assigning Courses to Teacher and Viewing Assigned Courses */}
          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "assignCourseToTeacher" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("assignCourseToTeacher")}
          >
            <FaChalkboardTeacher className="mr-2" />
            Assign Course to Teacher
          </button>

          <button
            className={`flex items-center px-4 py-2 rounded text-lg w-full ${activeTab === "viewAssignedCourses" ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveTab("viewAssignedCourses")}
          >
            <FaClipboardList className="mr-2" />
            View Assigned Courses
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-md rounded-lg p-6"
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
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
