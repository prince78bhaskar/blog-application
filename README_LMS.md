# DigiQuest LMS - Complete Learning Management System

A full-featured Learning Management System built with MERN stack (MongoDB, Express, React, Node.js) with Cashfree payment integration, JWT authentication, and comprehensive student/admin dashboards.

## 🚀 Features Implemented

### Backend
- **Authentication System**
  - JWT-based authentication with secure token generation
  - Password hashing with bcryptjs
  - Role-based access control (Student/Admin)
  - Protected routes with middleware
  - Auto-logout on token expiry

- **Course Management**
  - Full CRUD operations for courses
  - Video and notes management via LearningContent model
  - Syllabus and features structure
  - Course enrollment tracking

- **Payment Integration**
  - Cashfree payment gateway integration
  - Order creation and signature verification
  - Automatic student account creation after payment
  - Payment history tracking
  - Webhook support for payment notifications

- **Email Service**
  - Nodemailer integration with Gmail
  - Automatic credential email after enrollment
  - Professional HTML email templates

- **Dashboard APIs**
  - Student dashboard with course progress
  - Admin dashboard with statistics
  - Student and course management
  - Revenue and enrollment tracking

- **Lesson Progress Tracking**
  - Granular lesson completion tracking
  - Prevents lesson skipping
  - Sequential lesson access
  - Progress persistence across sessions

- **Security**
  - Rate limiting with express-rate-limit
  - CORS configuration
  - Input validation middleware
  - Error handling middleware
  - Enrollment check middleware

### Frontend
- **Authentication**
  - Login page with username/password
  - AuthContext for global state management
  - Protected routes with ProtectedRoute component
  - Auto-logout on token expiry
  - Toast notifications for auth errors

- **Course Pages**
  - Course listing page (Home.jsx)
  - Course details page with full information
  - Enrollment form with validation
  - Cashfree payment integration

- **Student Dashboard**
  - Overview with statistics
  - My Courses section with enrollments
  - Continue Learning functionality
  - Profile management
  - Responsive sidebar navigation

- **Course Learning**
  - Video player with playlist
  - PDF notes viewer
  - Mark as Read functionality
  - Progress tracking
  - Previous/Next navigation with lesson locking
  - Sequential lesson access enforcement

- **Admin Dashboard**
  - Overview with statistics
  - Student management with search
  - Course management with search
  - Course content management (videos/notes)
  - Revenue and enrollment tracking
  - Loading states for form submissions

- **UI/UX Features**
  - Responsive design for mobile, tablet, and desktop
  - Smooth animations with Framer Motion
  - Loading spinners and skeleton loaders
  - Toast notifications with react-toastify
  - Modern dashboard with sidebar navigation
  - Dark mode video learning interface
  - Duplicate submission prevention

## 📁 Project Structure

### Backend
```
backend/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controller/
│   ├── adminController.js       # Admin operations (stats, students, courses)
│   ├── authController.js        # Authentication (login, profile, logout)
│   ├── courseController.js      # Course CRUD operations
│   ├── dashboardController.js   # Dashboard data (student progress, courses)
│   ├── learningContentController.js  # Learning content (videos/notes) management
│   ├── lessonProgressController.js   # Lesson progress tracking
│   ├── paymentController.js     # Cashfree payment integration
│   └── userController.js        # User operations
├── middleware/
│   ├── auth.js                  # JWT verification middleware
│   ├── enrollmentCheck.js       # Enrollment verification middleware
│   ├── errorHandler.js          # Error handling middleware
│   ├── upload.js                # File upload middleware (Multer)
│   └── validate.js              # Input validation middleware
├── model/
│   ├── Course.js                # Course schema with embedded videos/notes
│   ├── Enrollment.js            # Enrollment schema with progress tracking
│   ├── LearningContent.js       # Learning content schema (videos/notes)
│   ├── LessonProgress.js        # Lesson completion tracking schema
│   └── User.js                  # User schema with authentication
├── routes/
│   ├── admin.js                 # Admin routes (stats, students, courses)
│   ├── auth.js                  # Auth routes (login, profile, logout)
│   ├── courses.js               # Course routes (CRUD, videos, notes)
│   ├── dashboard.js             # Dashboard routes (data, my-courses, progress)
│   ├── learningContent.js       # Learning content routes
│   ├── lessonProgress.js        # Lesson progress routes
│   ├── payment.js               # Payment routes (create-order, verify, webhook)
│   └── router.js                # Root router
├── scripts/
│   └── (utility scripts)
├── services/
│   └── emailService.js          # Email operations (Nodemailer)
├── utils/
│   └── generateCredentials.js   # Username/password generation utility
├── .env                         # Environment variables (not in git)
├── createAdmin.js               # Script to create admin account
├── package.json                 # Backend dependencies
├── server.js                    # Main Express server file
└── test.js                      # Test file
```

### Frontend
```
frontend/
├── public/
│   └── (static assets)
├── src/
│   ├── assets/
│   │   ├── (images, fonts, etc.)
│   ├── components/
│   │   ├── Layout.jsx           # Main layout wrapper
│   │   ├── LoadingSpinner.jsx   # Loading spinner component
│   │   ├── Navbar.jsx           # Navigation bar component
│   │   └── ProtectedRoute.jsx   # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context provider
│   ├── pages/
│   │   ├── About.jsx            # About page
│   │   ├── AdminDashboard.jsx   # Admin dashboard with stats and management
│   │   ├── Course.jsx           # Course listing page
│   │   ├── CourseDetails.jsx    # Course details and enrollment
│   │   ├── CourseLearning.jsx   # Video learning with progress tracking
│   │   ├── Dashboard.jsx        # Student dashboard
│   │   ├── Enroll.jsx           # Enrollment form
│   │   ├── Home.jsx             # Home page
│   │   ├── Login.jsx            # Login page
│   │   └── Placement.jsx        # Placement page
│   ├── services/
│   │   └── api.js               # API service with Axios interceptors
│   ├── utils/
│   │   └── videoUtils.js        # Video utility functions
│   ├── App.css                  # App styles
│   ├── App.jsx                  # Main app with React Router
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Frontend dependencies
├── README.md                   # Frontend README
└── vite.config.js               # Vite configuration
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cashfree Account
- Gmail Account (for email service)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

**Backend Dependencies:**
- `axios` - HTTP client
- `bcryptjs` - Password hashing
- `cashfree-pg` - Cashfree payment gateway
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `express` - Web framework
- `express-rate-limit` - Rate limiting
- `helmet` - Security headers
- `jsonwebtoken` - JWT authentication
- `mongoose` - MongoDB ODM
- `nodemailer` - Email service
- `stripe` - Stripe integration (备用)

3. **Configure environment variables**
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/digiquest
PORT=3000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_API_URL=https://sandbox.cashfree.com/pg
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

4. **Create Admin Account**
Run the admin creation script:
```bash
node createAdmin.js
```
Or manually create an admin in MongoDB with hashed password.

5. **Start the server**
```bash
node server.js
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

**Frontend Dependencies:**
- `@cashfreepayments/cashfree-js` - Cashfree SDK
- `@tailwindcss/vite` - Tailwind CSS for Vite
- `aos` - Animate On Scroll library
- `axios` - HTTP client
- `framer-motion` - Animation library
- `react` - React library
- `react-dom` - React DOM
- `react-router-dom` - React Router
- `react-toastify` - Toast notifications
- `tailwindcss` - CSS framework

3. **Configure environment variables**
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:3000/api
VITE_CASHFREE_APP_ID=your_cashfree_app_id
```

4. **Start the development server**
```bash
npm run dev
```

## 🔑 Important Configuration Steps

### Cashfree Setup
1. Create account at [Cashfree](https://www.cashfree.com)
2. Get App ID and Secret Key from dashboard
3. Add keys to backend `.env` and frontend `.env`
4. Use sandbox environment for testing: `https://sandbox.cashfree.com/pg`

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail
2. Generate App-specific password
3. Add email and app password to backend `.env`

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in backend `.env`
3. Ensure MongoDB is running before starting backend

## 🏗️ Project Architecture

### User Flow
1. **Guest User** → Browses courses on Home page
2. **Course Selection** → Views course details on CourseDetails page
3. **Enrollment** → Fills enrollment form with personal details
4. **Payment** → Completes payment via Cashfree
5. **Account Creation** → Auto-generated credentials sent via email
6. **Login** → Logs in with auto-generated credentials
7. **Dashboard** → Views enrolled courses and progress
8. **Learning** → Accesses CourseLearning page to watch videos/read notes
9. **Progress** → Marks lessons as complete, progresses sequentially

### Admin Flow
1. **Admin Login** → Authenticates with admin credentials
2. **Dashboard** → Views statistics (students, courses, revenue)
3. **Student Management** → View, search, and delete students
4. **Course Management** → View, search, and manage courses
5. **Content Management** → Add/update/delete videos and notes for courses

### Data Flow
- **Frontend** → React components → API service (Axios) → Backend routes → Controllers → Models → MongoDB
- **Authentication** → JWT tokens stored in localStorage → Attached to requests via Axios interceptors → Verified by auth middleware
- **Payment** → Cashfree SDK → Order creation → Payment verification → Webhook handling → Enrollment creation
- **Progress** → Lesson completion → LessonProgress model → Enrollment model update → Frontend state update

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - User logout (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/:id/videos` - Get course videos (protected)
- `GET /api/courses/:id/notes` - Get course notes (protected)
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Learning Content
- `POST /api/admin/course-content` - Add learning content (admin only)
- `PUT /api/admin/course-content/:id` - Update learning content (admin only)
- `DELETE /api/admin/course-content/:id` - Delete learning content (admin only)
- `GET /api/course-content/:courseId` - Get learning content by course (protected, enrollment check)
- `GET /api/course-content/content/:id` - Get learning content by ID (protected)
- `GET /api/course-content` - Get all learning content (admin only)

### Lesson Progress
- `POST /api/lesson-progress/complete` - Mark lesson as completed (protected)
- `GET /api/lesson-progress/:courseId` - Get lesson progress for a course (protected)
- `GET /api/lesson-progress/check/:lessonId` - Check if lesson is completed (protected)

### Payment
- `POST /api/payment/create-order` - Create Cashfree order
- `GET /api/payment/order/:orderId` - Fetch order details
- `POST /api/payment/verify` - Verify payment signature
- `POST /api/payment/webhook` - Cashfree webhook handler

### Dashboard
- `GET /api/dashboard` - Get dashboard data (protected)
- `GET /api/dashboard/my-courses` - Get user's courses (protected)
- `POST /api/dashboard/progress` - Update video progress (protected)

### Admin
- `GET /api/admin/stats` - Get admin statistics (admin only)
- `GET /api/admin/students` - Get all students (admin only, with search)
- `GET /api/admin/courses` - Get all courses (admin only, with search)
- `DELETE /api/admin/students/:id` - Delete student (admin only)

## 🔐 Security Features

- JWT authentication with secure token generation
- Password hashing with bcryptjs (salt rounds: 10)
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- CORS configuration with allowed origins
- Input validation middleware
- Error handling middleware
- Protected routes for sensitive operations
- Role-based access control (Student/Admin)
- Enrollment verification middleware for course access
- Unique indexes to prevent duplicate enrollments

## 🎨 UI Features

- Responsive design for mobile, tablet, and desktop
- Smooth animations with Framer Motion
- Loading spinners and skeleton loaders
- Toast notifications with react-toastify
- Modern dashboard with sidebar navigation
- Professional email templates
- Dark mode video learning interface
- Duplicate submission prevention on forms
- Sequential lesson locking with visual indicators
- Course completion badges and progress bars

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)
*Course listing with search and filtering*

### Course Details
![Course Details](screenshots/course-details.png)
*Course information, syllabus, and enrollment form*

### Enrollment & Payment
![Enrollment](screenshots/enrollment.png)
*Enrollment form and Cashfree payment integration*

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)
*Overview, enrolled courses, and progress tracking*

### Course Learning
![Course Learning](screenshots/course-learning.png)
*Video player, playlist, notes viewer, and progress tracking*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Statistics, student management, and course management*

## 🚀 Deployment

### Backend Deployment
1. Deploy to Railway, Render, or Heroku
2. Set environment variables in deployment platform
3. Ensure MongoDB is accessible (Atlas recommended)
4. Update FRONTEND_URL to production URL
5. Update Cashfree API URL to production: `https://api.cashfree.com/pg`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Set environment variables in deployment platform
4. Update VITE_API_URL to production backend URL
5. Update VITE_CASHFREE_APP_ID to production Cashfree App ID

## 📊 Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  username: String (required, unique),
  password: String (required, hashed with bcryptjs),
  mobile: String (required),
  role: String (enum: ['student', 'admin'], default: 'student'),
  purchasedCourses: [ObjectId (ref: Course)],
  paymentDetails: [{
    courseId: ObjectId (ref: Course),
    paymentId: String,
    orderId: String,
    amount: Number,
    paymentStatus: String,
    enrolledAt: Date
  }],
  progress: Map (of: {
    completedVideos: [String],
    lastWatched: String,
    progressPercentage: Number
  }),
  createdAt: Date,
  updatedAt: Date
}
```

### Course Collection
```javascript
{
  title: String (required),
  description: String (required),
  image: String (required),
  banner: String (required),
  instructor: String (required),
  duration: String (required),
  language: String (default: 'English'),
  level: String (enum: ['Beginner', 'Intermediate', 'Advanced'], required),
  price: Number (required),
  syllabus: [{ module: String, topics: [String] }],
  features: [String],
  videos: [{
    title: String (required),
    description: String (required),
    url: String (required),
    duration: String (required),
    sequence: Number (required),
    thumbnail: String
  }],
  notes: [{
    title: String (required),
    fileUrl: String (required),
    fileType: String (enum: ['pdf', 'zip', 'doc'], required)
  }],
  numberOfVideos: Number (default: 0),
  numberOfProjects: Number (default: 0),
  demoVideo: String,
  faqs: [{ question: String, answer: String }],
  studentBenefits: [String],
  category: String (required),
  isActive: Boolean (default: true),
  enrolledCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Collection
```javascript
{
  userId: ObjectId (ref: User, required),
  courseId: ObjectId (ref: Course, required),
  paymentId: String (required),
  orderId: String (required),
  amount: Number (required),
  paymentStatus: String (enum: ['pending', 'completed', 'failed', 'refunded'], default: 'completed'),
  enrolledAt: Date (default: Date.now),
  expiryDate: Date,
  progress: {
    completedVideos: [ObjectId (ref: Course.videos)],
    lastWatchedVideo: ObjectId (ref: Course.videos),
    progressPercentage: Number (default: 0)
  },
  createdAt: Date,
  updatedAt: Date
}
// Unique index: { userId: 1, courseId: 1 }
```

### LearningContent Collection
```javascript
{
  courseId: ObjectId (ref: Course, required),
  title: String (required, trim),
  type: String (enum: ['video', 'note'], required),
  videoUrl: String (trim),
  pdfUrl: String (trim),
  thumbnail: String (trim),
  description: String (trim),
  duration: String (trim),
  sequence: Number (default: 0),
  createdBy: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
// Index: { courseId: 1, type: 1, sequence: 1 }
```

### LessonProgress Collection
```javascript
{
  studentId: ObjectId (ref: User, required),
  courseId: ObjectId (ref: Course, required),
  lessonId: ObjectId (ref: LearningContent, required),
  completed: Boolean (default: false),
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
// Unique index: { studentId: 1, lessonId: 1 }
// Compound index: { studentId: 1, courseId: 1 }
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running (local or Atlas)
- Verify all environment variables are set correctly
- Check for port conflicts (default: 3000)

### Payment verification fails
- Verify Cashfree App ID and Secret Key are correct
- Check Cashfree API URL (sandbox vs production)
- Ensure signature generation logic matches Cashfree requirements
- Check webhook configuration if using webhooks

### Email not sending
- Check Gmail app password (not regular password)
- Verify email configuration in `.env`
- Enable 2-factor authentication on Gmail
- Check firewall/network settings
- Verify Nodemailer configuration

### Frontend API errors
- Verify `VITE_API_URL` is correct in frontend `.env`
- Check CORS configuration in backend
- Ensure backend is running on correct port
- Check browser console for specific error messages

### Lesson progress not saving
- Check if lesson progress routes are registered in server.js
- Verify route order (specific routes before parameterized)
- Check authentication middleware is working
- Ensure MongoDB indexes are created

### Continue Learning not working
- Verify route configuration in App.jsx
- Check if courseId is being passed correctly
- Ensure enrollment check middleware is not blocking access
- Check browser console for navigation errors

## 📝 Future Enhancements

The architecture is designed to support future features:
- Certificate generation upon course completion
- Quiz and assessment system
- Live class integration
- Discussion forum
- Progress analytics and reports
- Course reviews and ratings
- Wishlist functionality
- Coupon system
- Referral program
- Subscription plans
- Email verification
- Password reset functionality
- Attendance tracking
- Mobile app (React Native)
- Video speed control
- Downloadable offline content
- Instructor dashboard
- Course categories and filters
- Advanced search functionality
- Notification system
- Chat support

## 📄 License

This project is proprietary to DigiQuest.

## 👥 Support

For support, contact support@digiquest.com

---

## 🏆 Project Highlights

- **Full-Stack MERN Application** - Complete end-to-end solution
- **Payment Integration** - Cashfree payment gateway with webhook support
- **Role-Based Access** - Separate dashboards for students and admins
- **Progress Tracking** - Granular lesson-level progress with sequential access
- **Email Automation** - Auto-generated credentials sent via email
- **Security First** - JWT auth, rate limiting, CORS, input validation
- **Modern UI** - Responsive design with Framer Motion animations
- **Production Ready** - Error handling, logging, deployment ready
