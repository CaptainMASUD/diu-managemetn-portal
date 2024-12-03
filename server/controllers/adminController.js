const db = require('../config/db');

// Add a new course
exports.addCourse = (req, res) => {
  const { course_id, course_name, semester, year, credit } = req.body;
  const query = 'INSERT INTO courses (course_id, course_name, semester, year, credit) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [course_id, course_name, semester, year, credit], (err, result) => {
    if (err) {
      res.status(500).send('Error adding course.');
    } else {
      res.send('Course added successfully.');
    }
  });
};

// Assign an advisor to a student
exports.assignAdvisor = (req, res) => {
  const { student_id, teacher_id } = req.body;
  const query = 'INSERT INTO advisor_assignments (student_id, teacher_id) VALUES (?, ?)';
  db.query(query, [student_id, teacher_id], (err, result) => {
    if (err) {
      res.status(500).send('Error assigning advisor.');
    } else {
      res.send('Advisor assigned successfully.');
    }
  });
};

// Show all students
exports.getAllStudents = (req, res) => {
  const query = 'SELECT id, name, role FROM users WHERE role = "student"';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching students.');
    } else {
      res.json(result);
    }
  });
};

// Show all teachers
exports.getAllTeachers = (req, res) => {
  const query = 'SELECT id, name, role FROM users WHERE role = "teacher"';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching teachers.');
    } else {
      res.json(result);
    }
  });
};

// Show all courses
exports.getAllCourses = (req, res) => {
  const query = 'SELECT * FROM courses';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching courses.');
    } else {
      res.json(result);
    }
  });
};

// Show all advisor assignments
exports.getAllAdvisorAssignments = (req, res) => {
  const query = `
    SELECT sa.id, u1.name AS student_name, u2.name AS teacher_name
    FROM advisor_assignments sa
    JOIN users u1 ON sa.student_id = u1.id
    JOIN users u2 ON sa.teacher_id = u2.id
  `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching advisor assignments.');
    } else {
      res.json(result);
    }
  });
};

// Update a course
exports.updateCourse = (req, res) => {
  const { course_id, course_name, semester, year, credit, id } = req.body;
  const query = 'UPDATE courses SET course_id = ?, course_name = ?, semester = ?, year = ?, credit = ? WHERE id = ?';
  db.query(query, [course_id, course_name, semester, year, credit, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating course.');
    } else {
      res.send('Course updated successfully.');
    }
  });
};

// Delete a course
exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM courses WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting course.');
    } else {
      res.send('Course deleted successfully.');
    }
  });
};

// Update an advisor assignment
exports.updateAdvisorAssignment = (req, res) => {
  const { student_id, teacher_id, id } = req.body;
  const query = 'UPDATE advisor_assignments SET student_id = ?, teacher_id = ? WHERE id = ?';
  db.query(query, [student_id, teacher_id, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating advisor assignment.');
    } else {
      res.send('Advisor assignment updated successfully.');
    }
  });
};

// Delete an advisor assignment
exports.deleteAdvisorAssignment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM advisor_assignments WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting advisor assignment.');
    } else {
      res.send('Advisor assignment deleted successfully.');
    }
  });
};

// Update a student
exports.updateStudent = (req, res) => {
  const { id, name, email, password } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? AND role = "student"';
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating student.');
    } else {
      res.send('Student updated successfully.');
    }
  });
};

// Delete a student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ? AND role = "student"';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting student.');
    } else {
      res.send('Student deleted successfully.');
    }
  });
};

// Update a teacher
exports.updateTeacher = (req, res) => {
  const { id, name, email, password } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? AND role = "teacher"';
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating teacher.');
    } else {
      res.send('Teacher updated successfully.');
    }
  });
};

// Delete a teacher
exports.deleteTeacher = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ? AND role = "teacher"';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting teacher.');
    } else {
      res.send('Teacher deleted successfully.');
    }
  });
};
