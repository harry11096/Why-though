const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const escapeHtml = (value = '') =>
  String(value)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitiseUser = (user) =>
  typeof user.toSafeObject === 'function'
    ? user.toSafeObject()
    : {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

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
      fullName: escapeHtml(fullName),
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

const getProfile = async (req, res) => {
  return res.json({ success: true, data: sanitiseUser(req.user) });
};

const getMe = getProfile;

const updateProfile = async (req, res) => {
  try {
    const { fullName = '', bio = '', email } = req.body;
    const updates = {
      fullName: escapeHtml(fullName),
      bio: escapeHtml(bio),
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

module.exports = {
  register,
  login,
  getMe,
  getProfile,
  updateProfile,
};
