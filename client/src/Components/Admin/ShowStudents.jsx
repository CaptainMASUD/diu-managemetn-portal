import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate } from "react-icons/fa";
import { Button } from 'flowbite-react';

const ShowStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/students");
        const result = await response.json();
        setStudents(result);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/admin/delete-student/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
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
        <FaUserGraduate className="mr-2 text-blue-600" />
        All Students
      </h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-left">Student ID</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Role</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-2 border-b">{student.id}</td>
              <td className="px-4 py-2 border-b">{student.name}</td>
              <td className="px-4 py-2 border-b">{student.role}</td>
              <td className="px-4 py-2 border-b flex gap-2">
                <Button color="failure" onClick={() => handleDelete(student.id)} className="w-full">
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

export default ShowStudents;
