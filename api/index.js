import { app } from '../server.js';
import { connectDB } from '../config/db.js';
import { seedAdminUser } from '../utils/seedAdmin.js';

let initialization;

const initialize = () => {
  initialization ??= connectDB().then(() => seedAdminUser());
  return initialization;
};

export default async function handler(req, res) {
  try {
    await initialize();
    return app(req, res);
  } catch (error) {
    console.error('Server initialization failed:', error);
    return res.status(500).json({ message: 'Server initialization failed.' });
  }
}