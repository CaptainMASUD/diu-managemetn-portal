const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register a new user
// Register a new user
exports.register = async (req, res) => {
    const { name, password, role } = req.body;
    
    if (!name || !password || !role) {
      return res.status(400).send({ message: 'Name, password, and role are required.' });
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // SQL query to insert user
      const query = 'INSERT INTO users (name, password, role) VALUES (?, ?, ?)';
      
      db.query(query, [name, hashedPassword, role], (err, result) => {
        if (err) {
          // More detailed error
          console.error('Database error:', err);
          return res.status(500).send({ message: 'Error registering user. Please try again later.' });
        } else {
          res.send({ message: 'User registered successfully.' });
        }
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).send({ message: 'Error hashing password. Please try again later.' });
    }
  };

exports.login = (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).send('Name and password are required.');
    }
  
    const query = 'SELECT id, name, password, role FROM users WHERE name = ?';
    db.query(query, [name], async (err, results) => {
      if (err) {
        return res.status(500).send('Error logging in.');
      }
  
      if (results.length === 0) {
        return res.status(400).send('Invalid credentials.');
      }
  
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        // Send user data without the password
        const { password, ...userData } = user;
        res.send({ message: 'Login successful', user: userData });
      } else {
        res.status(400).send('Invalid credentials.');
      }
    });
  };