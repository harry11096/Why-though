const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Score = require('../models/Score');

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sanitiseUser = (user) =>
  typeof user.toSafeObject === 'function'
    ? user.toSafeObject()
    : {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

const formatAttempt = (attempt) => ({
  id: attempt._id,
  category: attempt.category,
  score: attempt.score,
  answers: attempt.answers,
  completedAt: attempt.completedAt,
  createdAt: attempt.createdAt,
  updatedAt: attempt.updatedAt,
});

const register = async (req, res) => {
  try {
    const { username, email, password, fullName = '', adminSetupKey } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Username, email and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username.trim() }, { email: email.trim().toLowerCase() }],
    });

    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists.' });
    }

    const role =
      adminSetupKey && process.env.ADMIN_SETUP_KEY && adminSetupKey === process.env.ADMIN_SETUP_KEY
        ? 'admin'
        : 'user';

    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      fullName: fullName.trim(),
      role,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: {
        token: createToken(user),
        user: sanitiseUser(user),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to register user.' });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, email, username, password } = req.body;
    const loginIdentifier = (identifier || email || username || '').trim();

    if (!loginIdentifier || !password) {
      return res.status(400).json({ success: false, error: 'Username/email and password are required.' });
    }

    const user = await User.findOne({
      $or: [{ username: loginIdentifier }, { email: loginIdentifier.toLowerCase() }],
    });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    return res.json({
      success: true,
      message: 'Login successful.',
      data: {
        token: createToken(user),
        user: sanitiseUser(user),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to log in.' });
  }
};

const getMe = async (req, res) => {
  return res.json({ success: true, data: sanitiseUser(req.user) });
};

const getProfile = async (req, res) => {
  return res.json({ success: true, data: sanitiseUser(req.user) });
};

const updateProfile = async (req, res) => {
  try {
    const { fullName = '', bio = '', email } = req.body;
    const updates = {
      fullName: fullName.trim(),
      bio: bio.trim(),
    };

    if (email && email.trim().toLowerCase() !== req.user.email) {
      const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });

      if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
        return res.status(409).json({ success: false, error: 'Email is already in use.' });
      }

      updates.email = email.trim().toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    return res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: sanitiseUser(updatedUser),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update profile.' });
  }
};

const getAttempts = async (req, res) => {
  try {
    const attempts = await Score.find({ userId: req.user._id }).sort({ completedAt: -1, createdAt: -1 });
    return res.json({ success: true, data: attempts.map(formatAttempt) });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to load attempts.' });
  }
};

const createAttempt = async (req, res) => {
  try {
    const { category, score = 0, answers = [] } = req.body;

    if (!category) {
      return res.status(400).json({ success: false, error: 'Category is required.' });
    }

    const attempt = await Score.create({
      userId: req.user._id,
      category: category.trim(),
      score,
      answers,
    });

    return res.status(201).json({
      success: true,
      message: 'Attempt saved successfully.',
      data: formatAttempt(attempt),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to save attempt.' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getProfile,
  updateProfile,
  getAttempts,
  createAttempt,
};
