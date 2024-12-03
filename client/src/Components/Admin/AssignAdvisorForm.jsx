import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { Button, Label, Select } from "flowbite-react"; // Use Select for dropdown
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const AssignAdvisorForm = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    teacher_id: "",
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Fetch students and teachers from the API
  useEffect(() => {
    // Fetch students
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/students");
        const data = await response.json();
        setStudents(data); // Set the students data in state
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    // Fetch teachers
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/teachers");
        const data = await response.json();
        setTeachers(data); // Set the teachers data in state
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/admin/assign-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.text();

      if (response.ok) {
        toast.success("Advisor assigned successfully!");  // Success toast
      } else {
        toast.error("Error assigning advisor.");  // Error toast
      }

     

    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while assigning advisor.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaChalkboardTeacher className="mr-2 text-green-600" />
        Assign Advisor
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Student Selection */}
        <div>
          <Label htmlFor="student_id" value="Student" />
          <Select
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Teacher Selection */}
        <div>
          <Label htmlFor="teacher_id" value="Teacher" />
          <Select
            id="teacher_id"
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" color="success">
          <FaChalkboardTeacher className="mr-2" />
          Assign Advisor
        </Button>
      </form>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default AssignAdvisorForm;
