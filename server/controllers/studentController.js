const db = require('../config/db');

// Register a course for a student
exports.registerCourse = (req, res) => {
  const { student_id, course_id } = req.body;
  const query = 'INSERT INTO registrations (student_id, course_id) VALUES (?, ?)';
  db.query(query, [student_id, course_id], (err, result) => {
    if (err) {
      res.status(500).send('Error registering course.');
    } else {
      res.send('Course registered successfully.');
    }
  });
};
