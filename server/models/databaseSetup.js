const db = require('../config/db');

// SQL Queries to create tables
const createTables = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL, -- For storing hashed passwords
  role ENUM('student', 'teacher', 'admin') NOT NULL,
  UNIQUE KEY unique_name_role (name, role)
);


CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id VARCHAR(50) NOT NULL UNIQUE,
  course_name VARCHAR(100) NOT NULL,
  semester VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  credit INT CHECK (credit BETWEEN 1 AND 6)
);

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  course_id INT,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS advisor_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  teacher_id INT,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS teacher_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT,
  course_id INT,
  FOREIGN KEY (teacher_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
`;

db.query(createTables, err => {
  if (err) throw err;
  console.log('Tables created or already exist.');
});
