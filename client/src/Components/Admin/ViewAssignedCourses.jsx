import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { FaChalkboardTeacher } from "react-icons/fa";

const ViewAssignedCourses = () => {
  const [teacherId, setTeacherId] = useState("");
  const [assignedCourses, setAssignedCourses] = useState([]);

  const fetchAssignedCourses = async () => {
    try {
      const response = await fetch(`http://localhost:3000/teacher/view-courses/${teacherId}`);
      const data = await response.json();
      setAssignedCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaChalkboardTeacher className="mr-2 text-green-600" />
        View Assigned Courses
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Teacher ID</label>
          <input
            type="text"
            placeholder="Enter teacher ID"
            className="input w-full p-2 border rounded-md"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />
        </div>
        <Button onClick={fetchAssignedCourses} className="w-full">
          View Courses
        </Button>
        {assignedCourses.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Assigned Courses</h3>
            <ul className="list-disc pl-5">
              {assignedCourses.map((course) => (
                <li key={course.course_id} className="text-gray-700">
                  {course.course_name} (Semester: {course.semester}, Year: {course.year})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          teacherId && <p className="mt-4 text-gray-600">No courses assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAssignedCourses;
