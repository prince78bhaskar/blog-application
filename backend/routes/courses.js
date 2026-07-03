import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseVideos,
  getCourseNotes
} from '../controller/courseController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.get('/:id/videos', auth, getCourseVideos);
router.get('/:id/notes', auth, getCourseNotes);
router.post('/', adminAuth, createCourse);
router.put('/:id', adminAuth, updateCourse);
router.delete('/:id', adminAuth, deleteCourse);

export default router;
