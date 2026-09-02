import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const defaultPermissions = ['manage_admins', 'manage_projects', 'manage_orders', 'delete_orders', 'upload_images'];

export const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });

  if (existingAdmin) {
    if (existingAdmin.role === 'admin' || existingAdmin.role !== 'owner' || (existingAdmin.permissions || []).length === 0) {
      existingAdmin.role = 'owner';
      existingAdmin.permissions = defaultPermissions;
      await existingAdmin.save();
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    username: 'admin',
    email: email.toLowerCase(),
    password: hashedPassword,
    role: process.env.ADMIN_ROLE || 'owner',
    permissions: process.env.ADMIN_PERMISSIONS
      ? process.env.ADMIN_PERMISSIONS.split(',').map((permission) => permission.trim()).filter(Boolean)
      : defaultPermissions,
  });

  console.log(`Admin user seeded with email: ${email}`);
};
