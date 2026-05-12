const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/dashboard', protect, getDashboardStats);

module.exports = router;