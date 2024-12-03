import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

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
      if (response.ok) {
        // Show success toast
        toast.success("Course added successfully!", {
          position: "top-right", // Toast position
          autoClose: 3000, // Time in ms for the toast to disappear
        });
        // Clear the form after successful submission
        setFormData({
          course_id: "",
          course_name: "",
          semester: "",
          year: "",
          credit: "",
        });
      } else {
        toast.error("Failed to add course. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaBook className="mr-2 text-blue-600" />
        Add New Course
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="course_id" value="Course ID" />
            <TextInput
              id="course_id"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              required
              placeholder="Enter Course ID"
              className="w-full"
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
              placeholder="Enter Course Name"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="semester" value="Semester" />
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Semester</option>
              <option value="Fall">Fall</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
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
              placeholder="Enter Year"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="credit" value="Credit" />
            <TextInput
              id="credit"
              name="credit"
              type="number"
              value={formData.credit}
              onChange={handleChange}
              required
              placeholder="Enter Credit Hours"
              className="w-full"
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-4">
          <FaCalendarAlt className="mr-2" />
          Add Course
        </Button>
      </form>

      {/* Toast Container to show the toasts */}
      <ToastContainer />
    </motion.div>
  );
};

export default AddCourseForm;
