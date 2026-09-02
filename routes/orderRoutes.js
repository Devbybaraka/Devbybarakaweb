import express from 'express';
import { body } from 'express-validator';
import { protectAdmin, requirePermission } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { deleteOrder, getOrders, submitOrder, trackOrder, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('clientName').trim().notEmpty().withMessage('Client name is required.'),
    body('clientEmail').isEmail().withMessage('Valid email is required.'),
    body('phoneNumber').trim().notEmpty().withMessage('Phone number is required.'),
    body('projectType').isIn(['Website Design', 'Business Website', 'E-Commerce Store', 'Web App', 'Landing Page', 'Full-Stack System']),
    body('budgetRange').notEmpty().withMessage('Budget range is required.'),
    body('projectDetails').trim().isLength({ min: 20 }).withMessage('Project details must be at least 20 characters long.'),
  ],
  handleValidationErrors,
  submitOrder,
);

router.get('/', protectAdmin, requirePermission('manage_orders'), getOrders);
router.get('/track', trackOrder);
router.put('/:id/status', protectAdmin, requirePermission('manage_orders'), updateOrderStatus);
router.delete('/:id', protectAdmin, requirePermission('delete_orders'), deleteOrder);

export default router;
