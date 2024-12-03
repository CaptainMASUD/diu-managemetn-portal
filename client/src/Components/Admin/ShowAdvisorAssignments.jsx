import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Button } from 'flowbite-react';

const ShowAdvisorAssignments = () => {
  const [assignments, setAssignments] = useState([]);

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
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left">Student Name</th>
            <th className="px-4 py-2 border-b text-left">Teacher Name</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-4 py-2 border-b">{assignment.student_name}</td>
              <td className="px-4 py-2 border-b">{assignment.teacher_name}</td>
              <td className="px-4 py-2 border-b flex gap-2">
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
