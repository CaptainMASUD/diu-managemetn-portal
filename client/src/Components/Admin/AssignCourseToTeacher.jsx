import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";

const AssignCourseToTeacher = () => {
  const [teacherId, setTeacherId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [teachers, setTeachers] = useState([]); // State to store the list of teachers
  const [courses, setCourses] = useState([]);   // State to store the list of courses
  const [error, setError] = useState(null);      // Error state to handle fetch failures
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Fetch teachers and courses from the API when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/teachers");
        const data = await response.json();
        setTeachers(data); // Set the teachers in state
      } catch (error) {
        setError("Failed to fetch teachers.");
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses");
        const data = await response.json();
        setCourses(data); // Set the courses in state
      } catch (error) {
        setError("Failed to fetch courses.");
      }
    };

    fetchTeachers();
    fetchCourses();
  }, []);

  // Handle form submission to assign a course to a teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for teacher and course selection
    if (!teacherId || !courseId) {
      setError("Please select both a teacher and a course.");
      return;
    }

    setLoading(true); // Start loading state

    const assignment = {
      teacher_id: teacherId,
      course_id: courseId,
    };

    try {
      const response = await fetch("http://localhost:3000/teacher/assign-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignment),
      });

      // Check if the response is not JSON (plain text response)
      if (response.ok) {
        const textResponse = await response.text(); // Get the response as plain text
        alert(textResponse); // Show the success or error message
        setTeacherId(""); // Reset the teacher ID dropdown
        setCourseId(""); // Reset the course ID dropdown
      } else {
        const errorResponse = await response.text(); // Get error as plain text
        setError(errorResponse || "Failed to assign course.");
      }
    } catch (error) {
      setError("Error assigning course: " + error.message);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Assign Course to Teacher</h2>

      {/* Display error if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading spinner when the form is submitting */}
      {loading && <p className="text-blue-500 mb-4">Assigning course...</p>}

      <form onSubmit={handleSubmit}>
        {/* Teacher ID Dropdown */}
        <div className="mb-4">
          <label htmlFor="teacher_id" className="block text-sm font-semibold text-gray-700">Teacher</label>
          <select
            id="teacher_id"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course ID Dropdown */}
        <div className="mb-4">
          <label htmlFor="course_id" className="block text-sm font-semibold text-gray-700">Course</label>
          <select
            id="course_id"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
          {loading ? "Assigning..." : "Assign Course"}
        </Button>
      </form>
    </div>
  );
};

export default AssignCourseToTeacher;
