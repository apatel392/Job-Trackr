const express = require('express');
const router = express.Router();
const {register, login, forgotpassword, resetpassword} = require('../controllers/authController');

router.post('/register',register);
router.post('/login',login);
router.post('/forgot-password',forgotpassword);
router.post('/reset-password',resetpassword);

module.exports = router;
