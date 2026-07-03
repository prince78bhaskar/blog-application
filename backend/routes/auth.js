import express from 'express';
import { login, getProfile, logout } from '../controller/authController.js';
import { auth } from '../middleware/auth.js';
// import { validateLogin } from '../middleware/validate.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', auth, getProfile);
router.post('/logout', auth, logout);

export default router;
