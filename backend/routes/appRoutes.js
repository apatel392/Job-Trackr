const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication,
    getApplicationById
} = require('../controllers/appController');

router.use(authMiddleware);
router.get('/',getApplications);
router.get('/:id',getApplicationById);
router.post('/',createApplication);
router.put('/:id',updateApplication);
router.delete('/:id',deleteApplication);

module.exports = router;