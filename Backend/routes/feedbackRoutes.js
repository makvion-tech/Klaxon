const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback, approveFeedback, deleteFeedback } = require('../controllers/feedback.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', createFeedback);
router.get('/', protect, getAllFeedback);
router.patch('/:id/approve', protect, approveFeedback);
router.delete('/:id', protect, deleteFeedback);

module.exports = router;