const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controller/adminController');
const { protect } = require('../middleware/Authmiddleware');

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;