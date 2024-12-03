import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaBook, FaCheckCircle, FaListAlt, FaUserTie, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button, Label, TextInput, Alert, Select, Card } from "flowbite-react";
import { useSelector } from "react-redux";

const RegisterCourseForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    student_id: currentUser ? currentUser.id : "",
    course_id: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [advisor, setAdvisor] = useState(null);
  const [showAdvisor, setShowAdvisor] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchRegisteredCourses(currentUser.id);
      fetchAdvisor(currentUser.id);
      fetchAllCourses();
    }
  }, [currentUser]);

  const fetchRegisteredCourses = async (student_id) => {
    try {
      const response = await fetch(`http://localhost:3000/student/${student_id}/registered-courses`);
      const result = await response.json();
      setRegisteredCourses(result);
    } catch (error) {
      console.error("Error fetching registered courses:", error);
    }
  };

  const fetchAdvisor = async (student_id) => {
    try {
      const response = await fetch(`http://localhost:3000/student/${student_id}/advisor`);
      const result = await response.json();
      setAdvisor(result);
    } catch (error) {
      console.error("Error fetching advisor:", error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const response = await fetch("http://localhost:3000/student/available-courses");
      const result = await response.json();
      setCourses(result);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

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
      
      // If the response contains an error message
      if (response.status !== 200) {
        setMessage(result); // Error message will be the response text
        setIsSuccess(false);
      } else {
        setMessage(result);
        setIsSuccess(true);
      }
  
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error registering the course. Please try again.");
      setIsSuccess(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center"
      >
        <FaUserGraduate className="mr-2 text-purple-600" />
        Student Course Management
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBook className="mr-2 text-purple-600" />
              Register for a Course
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="course_id" value="Select Course" />
                <Select
                  id="course_id"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name} ({course.course_id})
                    </option>
                  ))}
                </Select>
              </div>
              <Button type="submit" color="purple">
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
          </Card>
        </motion.div>

        {/* Registered Courses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaListAlt className="mr-2 text-purple-600" />
              Your Registered Courses
            </h2>
            {registeredCourses.length > 0 ? (
              <ul className="space-y-2">
                {registeredCourses.map((course) => (
                  <motion.li
                    key={course.course_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-gray-700"
                  >
                    <FaBook className="mr-2 text-purple-600" />
                    {course.course_name} ({course.course_id}) - {course.semester} {course.year}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You are not registered for any courses.</p>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Advisor Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUserTie className="mr-2 text-purple-600" />
              Advisor Information
            </h2>
            <Button
              color="light"
              onClick={() => setShowAdvisor(!showAdvisor)}
            >
              {showAdvisor ? <FaChevronUp /> : <FaChevronDown />}
            </Button>
          </div>
          <AnimatePresence>
            {showAdvisor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {advisor ? (
                  <div className="space-y-2">
                    <p className="text-lg text-gray-800">
                      <strong>Name:</strong> {advisor.advisor_name}
                    </p>
                    <p className="text-lg text-gray-800">
                      <strong>Email:</strong> {advisor.advisor_email}
                    </p>
                    <p className="text-lg text-gray-800">
                      <strong>Office:</strong> {advisor.advisor_office}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg text-red-600">
                    No advisor assigned yet. Please contact the admin.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterCourseForm;

