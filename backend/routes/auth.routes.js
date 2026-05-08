const express = require('express');
const {
  register,
  login,
  getMe,
  getProfile,
  updateProfile,
  getAttempts,
  createAttempt,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { loginLimiter } = require('../middleware/rateLimiter');
const { validateLogin, validateRegister } = require('../middleware/validate');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', loginLimiter, validateLogin, login);
router.get('/me', protect, getMe);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/attempts', protect, getAttempts);
router.post('/attempts', protect, createAttempt);

module.exports = router;
