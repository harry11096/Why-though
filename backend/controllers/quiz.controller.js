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

