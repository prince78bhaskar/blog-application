import express from 'express';
import {
  markLessonComplete,
  getLessonProgress,
  checkLessonComplete
} from '../controller/lessonProgressController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
// Routes are mounted at '/api/lesson-progress' in server.js
// IMPORTANT: Order matters - specific routes must come before parameterized routes

router.post('/complete', auth, (req, res, next) => {
  console.log('=== LESSON PROGRESS ROUTE HIT ===');
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('Body:', req.body);
  console.log('User:', req.user);
  next();
}, markLessonComplete);

router.get('/check/:lessonId', auth, (req, res, next) => {
  console.log('=== CHECK LESSON PROGRESS ROUTE HIT ===');
  console.log('Lesson ID:', req.params.lessonId);
  next();
}, checkLessonComplete);

router.get('/:courseId', auth, (req, res, next) => {
  console.log('=== GET LESSON PROGRESS ROUTE HIT ===');
  console.log('Course ID:', req.params.courseId);
  next();
}, getLessonProgress);

export default router;
