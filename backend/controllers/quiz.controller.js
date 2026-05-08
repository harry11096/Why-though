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

// 提交答案，服务端算分
const submitQuiz = async (req, res) => {
  try {
    const { category, answers } = req.body;
    // answers格式: [{ questionId, selectedAnswer }]

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, error: 'Answers are required' });
    }

    // 从数据库取正确答案
    const questionIds = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    // 服务端算分
    let score = 0;
    const gradedAnswers = answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      const isCorrect = question && question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) score++;
      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect: !!isCorrect
      };
    });

    // 存到数据库
    const scoreRecord = await Score.create({
      userId: req.user._id,
      category,
      score,
      answers: gradedAnswers
    });

    res.json({ success: true, data: { score, total: answers.length, scoreRecord } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 排行榜（每个用户最高分）
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      { $group: { _id: '$userId', highestScore: { $max: '$score' } } },
      { $sort: { highestScore: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { username: '$user.username', highestScore: 1, _id: 0 } }
    ]);
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 当前用户的历史答题记录
const getMyAttempts = async (req, res) => {
  try {
    const attempts = await Score.find({ userId: req.user._id })
      .sort({ completedAt: -1 });
    res.json({ success: true, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getCategories, getQuestions, submitQuiz, getLeaderboard, getMyAttempts };