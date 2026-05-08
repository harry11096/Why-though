const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { quizSubmitLimiter } = require('../middleware/rateLimiter');
const {
  getCategories,
  getQuestions,
  submitQuiz,
  getLeaderboard,
  getMyAttempts
} = require('../controllers/quiz.controller');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/leaderboard', getLeaderboard);
router.get('/questions', protect, getQuestions);
router.post('/submit', protect, quizSubmitLimiter, submitQuiz);
router.get('/attempts', protect, getMyAttempts);

module.exports = router;
