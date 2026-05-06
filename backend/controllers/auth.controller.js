const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sanitiseUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role
});

const register = async (req, res) => {
  try {
    const { username, email, password, adminSetupKey } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Username, email and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username: username.trim() }]
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
      email: email.toLowerCase().trim(),
      password,
      role
    });

    return res.status(201).json({
      success: true,
      data: {
        token: createToken(user),
        user: sanitiseUser(user)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to register user.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    return res.json({
      success: true,
      data: {
        token: createToken(user),
        user: sanitiseUser(user)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to log in.' });
  }
};

const getMe = async (req, res) =>
  res.json({
    success: true,
    data: sanitiseUser(req.user)
  });

module.exports = {
  register,
  login,
  getMe
};
