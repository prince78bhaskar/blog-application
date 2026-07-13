import express from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controller/testimonialController.js';
import { adminAuth } from '../middleware/auth.js';
import { uploadTestimonial } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Admin routes
router.get('/admin/all', adminAuth, getAllTestimonialsAdmin);
router.post('/admin', adminAuth, uploadTestimonial, createTestimonial);
router.put('/admin/:id', adminAuth, uploadTestimonial, updateTestimonial);
router.delete('/admin/:id', adminAuth, deleteTestimonial);

export default router;
