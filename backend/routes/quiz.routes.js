const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { quizSubmitLimiter } = require('../middleware/rateLimiter');
const {
  getCategories,
  getQuestions,
  submitQuiz,
  getLeaderboard,
  getMyAttempts
} = require('../controllers/quiz.controller');

// 公开路由（不需要登录）
router.get('/categories', getCategories);
router.get('/leaderboard', getLeaderboard);

// 需要登录的路由
router.get('/questions', protect, getQuestions);
router.post('/submit', protect, quizSubmitLimiter, submitQuiz);
router.get('/attempts', protect, getMyAttempts);

module.exports = router;
