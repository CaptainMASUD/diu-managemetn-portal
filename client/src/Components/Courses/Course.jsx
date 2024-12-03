import React, { useState, useEffect } from "react";
import { Card, Badge } from "flowbite-react"; // Using Flowbite for styling

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses"); // Adjust this to your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courses.map((course) => (
            <Card key={course.id}>
              <h5 className="text-lg font-bold">{course.course_name}</h5>
              <p className="text-sm">{course.description}</p>
              <Badge color="info" className="mt-2">
                {course.semester} {course.year}
              </Badge>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
