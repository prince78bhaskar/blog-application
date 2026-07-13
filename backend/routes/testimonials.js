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
import { uploadTestimonialCloudinary } from '../middleware/uploadCloudinary.js';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

// Admin routes
router.get('/admin/all', adminAuth, getAllTestimonialsAdmin);
router.post('/admin', adminAuth, uploadTestimonialCloudinary, createTestimonial);
router.put('/admin/:id', adminAuth, uploadTestimonialCloudinary, updateTestimonial);
router.delete('/admin/:id', adminAuth, deleteTestimonial);

export default router;
