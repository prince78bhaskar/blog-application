import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config({
    path: './.env',
    override: true
});

import router from './routes/router.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import paymentRoutes from './routes/payment.js';
import dashboardRoutes from './routes/dashboard.js';
import adminRoutes from './routes/admin.js';
import learningContentRoutes from './routes/learningContent.js';
import lessonProgressRoutes from './routes/lessonProgress.js';

console.log('=== ROUTES LOADED ===');
console.log('lessonProgressRoutes loaded:', !!lessonProgressRoutes);

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (!allowedOrigin) return false;
      if (allowedOrigin === origin) return true;
      if (/^http:\/\/localhost:\d+$/.test(origin) && /^http:\/\/localhost:\d+$/.test(allowedOrigin)) {
        return true;
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware - move BEFORE routes to see all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', router);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', learningContentRoutes);
app.use('/api/lesson-progress', lessonProgressRoutes);

console.log('=== ROUTES REGISTERED ===');
console.log('/api/lesson-progress -> lessonProgressRoutes');

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
});