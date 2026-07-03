import express from 'express';
import {
  getAdminStats,
  getAllStudents,
  getAllCoursesAdmin,
  deleteStudent
} from '../controller/adminController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', adminAuth, getAdminStats);
router.get('/students', adminAuth, getAllStudents);
router.get('/courses', adminAuth, getAllCoursesAdmin);
router.delete('/students/:id', adminAuth, deleteStudent);

export default router;
