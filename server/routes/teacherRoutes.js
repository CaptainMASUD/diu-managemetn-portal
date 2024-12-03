const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Existing routes
router.post('/assign-course', teacherController.assignCourse);
router.get('/view-courses/:teacher_id', teacherController.viewAssignedCourses);

// New route to view students assigned to the teacher (advisor assignment)
router.get('/view-assigned-advisors/:teacher_id', teacherController.viewAssignedAdvisor);

module.exports = router;
