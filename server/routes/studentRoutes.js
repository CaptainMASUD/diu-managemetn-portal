const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to register a course
router.post('/register-course', studentController.registerCourse);

// Route to get all available courses
router.get('/available-courses', studentController.getAllCourses);

// Route to get all registered courses for a student
router.get('/:student_id/registered-courses', studentController.getRegisteredCourses);

// Route to get the advisor of a student
router.get('/:student_id/advisor', studentController.getAdvisor);

module.exports = router;
