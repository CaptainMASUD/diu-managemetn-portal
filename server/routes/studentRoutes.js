const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/register-course', studentController.registerCourse);

module.exports = router;
