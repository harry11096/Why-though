const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { loginLimiter } = require('../middleware/rateLimiter');
const { validateLogin, validateRegister } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', loginLimiter, validateLogin, authController.login);
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.get('/attempts', protect, authController.getAttempts);
router.post('/attempts', protect, authController.createAttempt);

module.exports = router;
