const Question = require('../models/Question');
const Score = require('../models/Score');

// 获取所有分类
const getCategories = async (req, res) => {
  try {
    const categories = await Question.distinct('category', { isActive: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 按分类获取题目（随机洗牌，不暴露correctAnswer）
const getQuestions = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ success: false, error: 'Category is required' });
    }

    const questions = await Question.find({ category, isActive: true })
      .select('-correctAnswer');

    if (questions.length < 6) {
      return res.status(400).json({ success: false, error: 'Not enough questions in this category' });
    }

    // 随机洗牌，取6-10题
    const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    res.json({ success: true, data: shuffled });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

