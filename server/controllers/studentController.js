const db = require('../config/db');

// Register a course for a student, ensuring they are not registered for it already
exports.registerCourse = (req, res) => {
  const { student_id, course_id } = req.body;

  // Check if the student is already registered for the course
  const checkQuery = `
    SELECT * FROM registrations 
    WHERE student_id = ? AND course_id = ?
  `;
  
  db.query(checkQuery, [student_id, course_id], (err, results) => {
    if (err) {
      res.status(500).send('Error checking course registration.');
      return;
    }

    if (results.length > 0) {
      // If the student is already registered for the course, send an error message
      res.status(400).send('You are already registered for this course.');
    } else {
      // If not, proceed to register the course
      const query = 'INSERT INTO registrations (student_id, course_id) VALUES (?, ?)';
      db.query(query, [student_id, course_id], (err) => {
        if (err) {
          res.status(500).send('Error registering course.');
        } else {
          res.send('Course registered successfully.');
        }
      });
    }
  });
};


// Get all registered courses for a student
exports.getRegisteredCourses = (req, res) => {
  const { student_id } = req.params;
  const query = `
    SELECT c.course_id, c.course_name, c.semester, c.year, c.credit
    FROM registrations r
    JOIN courses c ON r.course_id = c.id
    WHERE r.student_id = ?
  `;
  db.query(query, [student_id], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching registered courses.');
    } else {
      res.json(results);
    }
  });
};

// Get the advisor for a student
exports.getAdvisor = (req, res) => {
  const { student_id } = req.params;
  const query = `
    SELECT u.name AS advisor_name
    FROM advisor_assignments a
    JOIN users u ON a.teacher_id = u.id
    WHERE a.student_id = ?
  `;
  db.query(query, [student_id], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching advisor.');
    } else if (results.length === 0) {
      res.send('No advisor assigned to this student.');
    } else {
      res.json(results[0]);
    }
  });
};

// Get all available courses
exports.getAllCourses = (req, res) => {
  const query = 'SELECT id, course_id, course_name FROM courses';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching courses.');
    } else {
      res.json(results);
    }
  });
};
