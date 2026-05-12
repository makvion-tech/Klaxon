const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, updateInquiryStatus } = require('../controllers/inquiry.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', createInquiry);
router.get('/', protect, getAllInquiries);
router.patch('/:id/status', protect, updateInquiryStatus);

module.exports = router;