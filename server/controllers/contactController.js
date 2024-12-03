const db = require('../config/db');

// Handle form submissions
exports.submitContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required.');
  }

  const query = `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error submitting contact form.');
    }
    res.send('Message sent successfully.');
  });
};

// Retrieve all messages (admin use)
exports.getAllMessages = (req, res) => {
  const query = `SELECT * FROM contact_messages ORDER BY created_at DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching messages.');
    }
    res.json(results);
  });
};
