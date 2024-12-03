// teacherController.js

const db = require('../config/db'); // Adjust the path to your database setup file

// Assign a course to a teacher
exports.assignCourse = (req, res) => {
  const { teacher_id, course_id } = req.body;
  const query = 'INSERT INTO teacher_courses (teacher_id, course_id) VALUES (?, ?)';

  db.query(query, [teacher_id, course_id], (err, result) => {
    if (err) {
      console.error('Error assigning course:', err);
      res.status(500).send('Error assigning course to teacher.');
    } else {
      res.send('Course assigned to teacher successfully.');
    }
  });
};

// View courses taught by a teacher
exports.viewAssignedCourses = (req, res) => {
  const { teacher_id } = req.params;
  const query = `
    SELECT c.course_id, c.course_name, c.semester, c.year, c.credit 
    FROM teacher_courses tc 
    JOIN courses c ON tc.course_id = c.id 
    WHERE tc.teacher_id = ?`;

  db.query(query, [teacher_id], (err, results) => {
    if (err) {
      console.error('Error retrieving courses:', err);
      res.status(500).send('Error retrieving courses.');
    } else {
      res.json(results);
    }
  });
};

// View students assigned to a particular advisor (teacher)
exports.viewAssignedAdvisor = (req, res) => {
  const { teacher_id } = req.params;
  const query = `
    SELECT u.id AS student_id, u.name AS student_name
    FROM advisor_assignments aa
    JOIN users u ON aa.student_id = u.id
    WHERE aa.teacher_id = ?`;

  db.query(query, [teacher_id], (err, results) => {
    if (err) {
      console.error('Error retrieving students assigned to teacher:', err);
      res.status(500).send('Error retrieving students assigned to teacher.');
    } else {
      res.json(results);
    }
  });
};
