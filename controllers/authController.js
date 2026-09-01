import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while logging in.' });
  }
};

export const getAdminProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
};
