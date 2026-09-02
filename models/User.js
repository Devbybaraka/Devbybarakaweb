import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['owner', 'manager', 'editor', 'sales'],
    default: 'owner',
  },
  permissions: {
    type: [String],
    enum: ['manage_admins', 'manage_projects', 'manage_orders', 'delete_orders', 'upload_images'],
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
