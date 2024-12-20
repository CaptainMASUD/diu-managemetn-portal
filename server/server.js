const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbSetup = require('./models/databaseSetup'); // Ensures tables are created
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const contactRoutes = require('./routes/contactRoutes'); // Import contact routes
const statisticsRoutes = require('./routes/statisticsRoutes'); // Import statistics routes

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/auth', authRoutes); // Authentication routes
app.use('/contact', contactRoutes); // Contact form routes
app.use('/statistics', statisticsRoutes); // Statistics route

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
