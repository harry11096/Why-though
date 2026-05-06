const express = require('express');
const {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  toggleQuestionStatus,
  bulkImportQuestions,
  allowedCategories
} = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');

const router = express.Router();

router.use(protect, adminOnly);

router.get('/questions', listQuestions);
router.get('/categories', (req, res) => res.json({ success: true, data: allowedCategories }));
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);
router.patch('/questions/:id/toggle', toggleQuestionStatus);
router.post('/questions/bulk', bulkImportQuestions);

module.exports = router;
