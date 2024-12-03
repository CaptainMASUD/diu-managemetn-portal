import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaSearch } from "react-icons/fa";  // Import FaSearch for search icon
import { Button, TextInput } from 'flowbite-react'; // Import TextInput for styled input

const ShowTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/teachers");
        const result = await response.json();
        setTeachers(result);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/admin/delete-teacher/${id}`, {
        method: "DELETE",
      });
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.id.toString().includes(searchQuery)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaChalkboardTeacher className="mr-2 text-green-600" />
        All Teachers
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex items-center gap-2">
        <FaSearch className="text-gray-600" />
        <TextInput
          placeholder="Search by teacher name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left">Teacher ID</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Role</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="px-4 py-2 border-b">{teacher.id}</td>
              <td className="px-4 py-2 border-b">{teacher.name}</td>
              <td className="px-4 py-2 border-b">{teacher.role}</td>
              <td className="px-4 py-2 border-b flex gap-2">
                <Button color="failure" onClick={() => handleDelete(teacher.id)} className="w-full">
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

export default ShowTeachers;
