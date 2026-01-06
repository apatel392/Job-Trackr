const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getInterviews, addInterview, deleteInterview, reminderInterview, generate } = require('../controllers/interviewController');

router.use(authMiddleware);
router.get('/:jobId',getInterviews);
router.post('/',addInterview);
router.delete('/:id',deleteInterview);
router.get('/',reminderInterview);
router.post('/generate',generate);

module.exports = router;