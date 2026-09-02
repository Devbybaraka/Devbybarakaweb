import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const allowedRoles = ['owner', 'manager', 'editor', 'sales'];

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
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
      permissions: user.permissions,
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
    permissions: user.permissions,
  });
};

export const createAdminUser = async (req, res) => {
  const { username, email, password, role, permissions = [] } = req.body;

  if (!username || !email || !password || !allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Username, email, password, and a valid role are required.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });

    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email or username already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: passwordHash,
      role,
      permissions,
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while creating the admin user.' });
  }
};
