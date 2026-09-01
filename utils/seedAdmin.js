import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    username: 'admin',
    email,
    password: hashedPassword,
    role: 'admin',
  });

  console.log(`Admin user seeded with email: ${email}`);
};
