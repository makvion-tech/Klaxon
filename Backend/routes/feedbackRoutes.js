const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback, approveFeedback, deleteFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/Authmiddleware');

router.post('/', createFeedback);
router.get('/', protect, getAllFeedback);
router.patch('/:id/approve', protect, approveFeedback);
router.delete('/:id', protect, deleteFeedback);

module.exports = router;