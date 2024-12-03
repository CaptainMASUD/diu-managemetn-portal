import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaBook, FaCheckCircle } from "react-icons/fa";
import { Button, Label, TextInput, Alert } from "flowbite-react";

const RegisterCourseForm = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);
    try {
      const response = await fetch("http://localhost:3000/student/register-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      setMessage(result);
      setIsSuccess(response.ok);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error registering the course. Please try again.");
      setIsSuccess(false);
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
        <FaBook className="mr-2 text-purple-600" />
        Register for a Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="student_id" value="Student ID" />
          <TextInput
            id="student_id"
            name="student_id"
            type="number"
            value={formData.student_id}
            onChange={handleChange}
            required
            icon={FaUserGraduate}
          />
        </div>
        <div>
          <Label htmlFor="course_id" value="Course ID" />
          <TextInput
            id="course_id"
            name="course_id"
            type="number"
            value={formData.course_id}
            onChange={handleChange}
            required
            icon={FaBook}
          />
        </div>
        <Button type="submit" className="w-full" color="purple">
          <FaCheckCircle className="mr-2" />
          Register
        </Button>
      </form>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Alert color={isSuccess ? "success" : "failure"}>
            <span className="font-medium">{message}</span>
          </Alert>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisterCourseForm;

