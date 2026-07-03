import express from 'express';
import { getDashboardData, getMyCourses, updateProgress } from '../controller/dashboardController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getDashboardData);
router.get('/my-courses', auth, getMyCourses);
router.post('/progress', auth, updateProgress);

export default router;
