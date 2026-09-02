import express from 'express';
import { body } from 'express-validator';
import { createAdminUser, loginAdmin, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin, requirePermission } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  handleValidationErrors,
  loginAdmin,
);

router.get('/me', protectAdmin, getAdminProfile);

router.post('/users', protectAdmin, requirePermission('manage_admins'), createAdminUser);

export default router;
