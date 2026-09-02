import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { protectAdmin, requirePermission } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protectAdmin, requirePermission('upload_images'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'devbybaraka-portfolio',
      resource_type: 'image',
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    return res.status(500).json({ message: 'Image upload failed.', error: error.message });
  }
});

export default router;
