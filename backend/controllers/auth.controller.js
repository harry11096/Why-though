const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Score = require('../models/Score');

const signToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const formatAttempt = (attempt) => ({
  id: attempt._id,
  category: attempt.category,
  score: attempt.score,
  answers: attempt.answers,
  completedAt: attempt.completedAt,
  createdAt: attempt.createdAt,
  updatedAt: attempt.updatedAt,
});

exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName = '' } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username.trim() }, { email: email.trim().toLowerCase() }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      fullName: fullName.trim(),
    });

    return res.status(201).json({
      message: 'Registration successful.',
      token: signToken(user),
      user: user.toSafeObject(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user.', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Username/email and password are required.' });
    }

    const user = await User.findOne({
      $or: [{ username: identifier.trim() }, { email: identifier.trim().toLowerCase() }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json({
      message: 'Login successful.',
      token: signToken(user),
      user: user.toSafeObject(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log in.', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  return res.json({ user: req.user.toSafeObject() });
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName = '', bio = '', email } = req.body;
    const updates = {
      fullName: fullName.trim(),
      bio: bio.trim(),
    };

    if (email && email.trim().toLowerCase() !== req.user.email) {
      const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
      if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
        return res.status(409).json({ message: 'Email is already in use.' });
      }
      updates.email = email.trim().toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({
      message: 'Profile updated successfully.',
      user: updatedUser.toSafeObject(),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile.', error: error.message });
  }
};

exports.getAttempts = async (req, res) => {
  try {
    const attempts = await Score.find({ userId: req.user._id }).sort({ completedAt: -1, createdAt: -1 });
    return res.json({ attempts: attempts.map(formatAttempt) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load attempts.', error: error.message });
  }
};

exports.createAttempt = async (req, res) => {
  try {
    const { category, score = 0, answers = [] } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }

    const attempt = await Score.create({
      userId: req.user._id,
      category: category.trim(),
      score,
      answers,
    });

    return res.status(201).json({
      message: 'Attempt saved successfully.',
      attempt: formatAttempt(attempt),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to save attempt.', error: error.message });
  }
};
