const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Course routes
router.post('/add-course', adminController.addCourse);
router.put('/update-course', adminController.updateCourse);
router.delete('/delete-course/:id', adminController.deleteCourse);

// Advisor assignment routes
router.post('/assign-advisor', adminController.assignAdvisor);
router.put('/update-advisor', adminController.updateAdvisorAssignment);
router.delete('/delete-advisor-assignment/:id', adminController.deleteAdvisorAssignment);

// Display routes
router.get('/students', adminController.getAllStudents);
router.get('/teachers', adminController.getAllTeachers);
router.get('/courses', adminController.getAllCourses);
router.get('/advisor-assignments', adminController.getAllAdvisorAssignments);

// Update and Delete Student Routes
router.put('/update-student', adminController.updateStudent);
router.delete('/delete-student/:id', adminController.deleteStudent);

// Update and Delete Teacher Routes
router.put('/update-teacher', adminController.updateTeacher);
router.delete('/delete-teacher/:id', adminController.deleteTeacher);

module.exports = router;
