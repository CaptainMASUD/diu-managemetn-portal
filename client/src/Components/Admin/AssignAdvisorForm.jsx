import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";

const AssignAdvisorForm = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    teacher_id: "",
  });

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
      alert(result);
    } catch (error) {
      console.error("Error:", error);
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
          <Label htmlFor="teacher_id" value="Teacher ID" />
          <TextInput
            id="teacher_id"
            name="teacher_id"
            type="number"
            value={formData.teacher_id}
            onChange={handleChange}
            required
            icon={FaChalkboardTeacher}
          />
        </div>
        <Button type="submit" className="w-full" color="success">
          <FaChalkboardTeacher className="mr-2" />
          Assign Advisor
        </Button>
      </form>
    </motion.div>
  );
};

export default AssignAdvisorForm;
