const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getInterviews, addInterview, deleteInterview, reminderInterview } = require('../controllers/interviewController');


router.use(authMiddleware);
router.get('/:jobId',getInterviews);
router.post('/',addInterview);
router.delete('/:id',deleteInterview);
router.get('/',reminderInterview)

module.exports = router;