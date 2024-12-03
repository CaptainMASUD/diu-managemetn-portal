import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBookOpen, FaSpinner } from "react-icons/fa";
import { Card, Badge } from "flowbite-react";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const teacherId = currentUser?.id;

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!teacherId) {
      setError("Teacher ID not available.");
      setLoadingStudents(false);
      setLoadingCourses(false);
      return;
    }

    const fetchAssignedStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/teacher/view-assigned-advisors/${teacherId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch students assigned to the teacher.");
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingStudents(false);
      }
    };

    const fetchAssignedCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/teacher/view-courses/${teacherId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses assigned to the teacher.");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchAssignedStudents();
    fetchAssignedCourses();
  }, [teacherId]);

  if (loadingStudents || loadingCourses) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaUserGraduate className="mr-2 text-blue-600" />
        Dashboard
      </h2>

      {/* Students Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Assigned Students</h3>
        {students.length === 0 ? (
          <p className="text-gray-600 text-center">No students assigned.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {students.map((student) => (
              <motion.div
                key={student.student_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {student.student_name}
                    </h5>
                    <Badge color="info" size="sm">
                      ID: {student.student_id}
                    </Badge>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Contact: {student.email || "N/A"}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Courses Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Assigned Courses</h3>
        {courses.length === 0 ? (
          <p className="text-gray-600 text-center">No courses assigned.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <motion.div
                key={course.course_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {course.course_name}
                    </h5>
                    <Badge color="success" size="sm">
                      ID: {course.course_id}
                    </Badge>
                  </div>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Credits: {course.credits || "N/A"}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default TeacherDashboard;
