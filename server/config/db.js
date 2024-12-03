const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'student_management',
  multipleStatements: true, // Enable for setup queries
});

// Connect to database
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

module.exports = db;
