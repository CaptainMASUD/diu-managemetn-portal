import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaSearch } from "react-icons/fa";  // Import FaSearch for the search icon
import { Button, TextInput } from 'flowbite-react'; // Use TextInput for the search field

const ShowCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses");
        const result = await response.json();
        setCourses(result);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/admin/delete-course/${id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Filter courses based on search query (by course name or ID)
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.course_id.toString().includes(searchQuery)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaBook className="mr-2 text-blue-600" />
        All Courses
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex items-center gap-2">
        <FaSearch className="text-gray-600" />
        <TextInput
          placeholder="Search by course name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left">Course ID</th>
            <th className="px-4 py-2 border-b text-left">Course Name</th>
            <th className="px-4 py-2 border-b text-left">Semester</th>
            <th className="px-4 py-2 border-b text-left">Year</th>
            <th className="px-4 py-2 border-b text-left">Credit</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id}>
              <td className="px-4 py-2 border-b">{course.course_id}</td>
              <td className="px-4 py-2 border-b">{course.course_name}</td>
              <td className="px-4 py-2 border-b">{course.semester}</td>
              <td className="px-4 py-2 border-b">{course.year}</td>
              <td className="px-4 py-2 border-b">{course.credit}</td>
              <td className="px-4 py-2 border-b flex gap-2">
                <Button color="failure" onClick={() => handleDelete(course.id)} className="w-full">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ShowCourses;
