import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    semester: "",
    year: "",
    credit: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/admin/add-course", {
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
        <FaBook className="mr-2 text-blue-600" />
        Add New Course
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="course_id" value="Course ID" />
          <TextInput
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="course_name" value="Course Name" />
          <TextInput
            id="course_name"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="semester" value="Semester" />
          <TextInput
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="year" value="Year" />
          <TextInput
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="credit" value="Credit" />
          <TextInput
            id="credit"
            name="credit"
            type="number"
            value={formData.credit}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          <FaCalendarAlt className="mr-2" />
          Add Course
        </Button>
      </form>
    </motion.div>
  );
};

export default AddCourseForm;
