const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { protect } = require('../middleware/Authmiddleware');

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;