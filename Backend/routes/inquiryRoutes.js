const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, updateInquiryStatus } = require('../controller/inquiryController');
const { protect } = require('../middleware/Authmiddleware');

router.post('/', createInquiry);
router.get('/', protect, getAllInquiries);
router.patch('/:id/status', protect, updateInquiryStatus);

module.exports = router;