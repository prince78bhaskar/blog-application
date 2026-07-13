import express from 'express';
import {
  addLearningContent,
  getLearningContentByCourse,
  getLearningContentById,
  updateLearningContent,
  deleteLearningContent,
  getAllLearningContent
} from '../controller/learningContentController.js';
import { auth, adminAuth } from '../middleware/auth.js';
import { checkEnrollment } from '../middleware/enrollmentCheck.js';
import { uploadLearningContentCloudinary } from '../middleware/uploadCloudinary.js';

const router = express.Router();

// Admin routes - protected with file upload support
router.post('/admin/course-content', adminAuth, uploadLearningContentCloudinary, addLearningContent);
router.put('/admin/course-content/:id', adminAuth, uploadLearningContentCloudinary, updateLearningContent);
router.delete('/admin/course-content/:id', adminAuth, deleteLearningContent);

// Public/Student routes - protected with auth and enrollment check
router.get('/course-content/:courseId', auth, checkEnrollment, getLearningContentByCourse);
router.get('/course-content/content/:id', auth, getLearningContentById);
router.get('/course-content', adminAuth, getAllLearningContent);

export default router;
