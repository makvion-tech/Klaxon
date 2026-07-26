const express = require('express');
const router = express.Router();
const { login, getMe, changePassword } = require('../controller/authController');
const { protect } = require('../middleware/Authmiddleware');

router.post('/login', login);
router.get('/me', protect, getMe);
router.patch('/change-password', protect, changePassword);

module.exports = router;