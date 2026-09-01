import express from 'express';
import { body } from 'express-validator';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validation.js';
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectBySlug);

router.post('/', protectAdmin, [body('title').notEmpty(), body('description').notEmpty(), body('image').notEmpty(), body('techStack').isArray({ min: 1 })], handleValidationErrors, createProject);

router.put(
  '/:id',
  protectAdmin,
  [
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('techStack').optional().isArray({ min: 1 }),
  ],
  handleValidationErrors,
  updateProject,
);

router.delete('/:id', protectAdmin, deleteProject);

export default router;
