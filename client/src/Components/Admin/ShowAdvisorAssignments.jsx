import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaSearch } from "react-icons/fa";  // Import FaSearch for the search icon
import { Button, TextInput } from 'flowbite-react'; // Use TextInput for the search field

const ShowAdvisorAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/advisor-assignments");
        const result = await response.json();
        setAssignments(result);
      } catch (error) {
        console.error("Error fetching advisor assignments:", error);
      }
    };
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/admin/delete-advisor-assignment/${id}`, {
        method: "DELETE",
      });
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    } catch (error) {
      console.error("Error deleting advisor assignment:", error);
    }
  };

  // Filter assignments based on search query (by student name or teacher name)
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.teacher_name.toLowerCase().includes(searchQuery.toLowerCase())
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
        Advisor Assignments
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex items-center gap-2">
        <FaSearch className="text-gray-600" />
        <TextInput
          placeholder="Search by student or teacher name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left text-center">Student Name</th>
            <th className="px-4 py-2 border-b text-left text-center">Teacher Name</th>
            <th className="px-4 py-2 border-b text-left text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-4 py-2 border-b text-center">{assignment.student_name}</td>
              <td className="px-4 py-2 border-b text-center">{assignment.teacher_name}</td>
              <td className="px-4 py-2 border-b flex gap-2 justify-center">
                <Button color="failure" onClick={() => handleDelete(assignment.id)} className="w-full">
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

export default ShowAdvisorAssignments;
