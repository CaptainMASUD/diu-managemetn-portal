const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// Route to get the statistics
router.get('/get-stats', statisticsController.getStatistics);

module.exports = router;
