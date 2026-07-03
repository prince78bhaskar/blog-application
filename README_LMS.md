# DigiQuest LMS - Complete Learning Management System

A full-featured Learning Management System built with MERN stack (MongoDB, Express, React, Node.js) with Razorpay payment integration, JWT authentication, and comprehensive student/admin dashboards.

## 🚀 Features Implemented

### Backend
- **Authentication System**
  - JWT-based authentication with secure token generation
  - Password hashing with bcrypt
  - Role-based access control (Student/Admin)
  - Protected routes with middleware

- **Course Management**
  - Full CRUD operations for courses
  - Video and notes management
  - Syllabus and features structure
  - Course enrollment tracking

- **Payment Integration**
  - Razorpay payment gateway integration
  - Order creation and signature verification
  - Automatic student account creation after payment
  - Payment history tracking

- **Email Service**
  - Nodemailer integration with Gmail
  - Automatic credential email after enrollment
  - Professional HTML email templates

- **Dashboard APIs**
  - Student dashboard with course progress
  - Admin dashboard with statistics
  - Student and course management
  - Revenue and enrollment tracking

- **Security**
  - Helmet for security headers
  - Rate limiting with express-rate-limit
  - CORS configuration
  - Input validation middleware
  - Error handling middleware

### Frontend
- **Authentication**
  - Login page with username/password
  - AuthContext for global state management
  - Protected routes
  - Auto-logout on token expiry

- **Course Pages**
  - Course listing page (existing)
  - Course details page with full information
  - Enrollment form with validation
  - Razorpay payment integration

- **Student Dashboard**
  - Overview with statistics
  - My Courses section
  - Profile management
  - Responsive sidebar navigation

- **Course Learning**
  - Video player with playlist
  - Progress tracking
  - Notes and resources download
  - Previous/Next navigation

- **Admin Dashboard**
  - Overview with statistics
  - Student management with search
  - Course management with search
  - Revenue and enrollment tracking

## 📁 Project Structure

### Backend
```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controller/
│   ├── adminController.js       # Admin operations
│   ├── authController.js        # Authentication
│   ├── courseController.js      # Course CRUD
│   ├── dashboardController.js   # Dashboard data
│   ├── paymentController.js     # Razorpay integration
│   └── userController.js        # User operations
├── middleware/
│   ├── auth.js                  # JWT verification
│   ├── errorHandler.js          # Error handling
│   └── validate.js              # Input validation
├── model/
│   ├── Course.js                # Course schema
│   ├── Enrollment.js            # Enrollment schema
│   └── User.js                  # User schema
├── routes/
│   ├── admin.js                 # Admin routes
│   ├── auth.js                  # Auth routes
│   ├── courses.js               # Course routes
│   ├── dashboard.js             # Dashboard routes
│   └── payment.js               # Payment routes
├── services/
│   └── emailService.js          # Email operations
├── utils/
│   └── generateCredentials.js   # Username/password generation
├── .env.example                 # Environment variables template
└── server.js                    # Main server file
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.jsx   # Loading component
│   │   └── Navbar.jsx           # Navigation bar
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── pages/
│   │   ├── About.jsx            # About page (existing)
│   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   ├── Course.jsx           # Course listing (existing)
│   │   ├── CourseDetails.jsx    # Course details page
│   │   ├── CourseLearning.jsx   # Video learning page
│   │   ├── Dashboard.jsx        # Student dashboard
│   │   ├── Enroll.jsx           # Enrollment page (existing)
│   │   ├── Home.jsx             # Home page (existing)
│   │   ├── Login.jsx            # Login page
│   │   └── Placement.jsx        # Placement page (existing)
│   ├── services/
│   │   └── api.js               # API service with axios
│   ├── App.jsx                  # Main app with routes
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
└── index.html                   # HTML with Razorpay script
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas))
- Razorpay Account
- Gmail Account (for email service)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install bcrypt jsonwebtoken nodemailer razorpay multer cloudinary helmet express-rate-limit
```

3. **Configure environment variables**
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
MONGO_URI=mongodb://localhost:27017/digiquest
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

4. **Start the server**
```bash
node server.js
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Configure environment variables**
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

3. **Start the development server**
```bash
npm run dev
```

## 🔑 Important Configuration Steps

### Razorpay Setup
1. Create account at [Razorpay](https://razorpay.com)
2. Get Key ID and Key Secret from dashboard
3. Add keys to backend `.env` and frontend `.env`

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail
2. Generate App-specific password
3. Add email and app password to backend `.env`

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in backend `.env`
3. Ensure MongoDB is running before starting backend

## 📝 Manual Steps Required

### Update Course.jsx Links
The Course.jsx file needs manual updates to link course cards to the CourseDetails page. I successfully updated the first 3 courses (Full Stack, Python, Data Analytics). You need to manually update the remaining courses:

**Java Programming** (around line 363-385):
- Change the "View" button from `onClick` to `Link to='/course/java-prog'`
- Change the "Enroll" link from `to='/Enroll'` to `to='/course/java-prog'`

**C & C++** (around line 409-431):
- Change the "View" button from `onClick` to `Link to='/course/cpp-prog'`
- Change the "Enroll" link from `to='/Enroll'` to `to='/course/cpp-prog'`

**Digital Marketing** (around line 455-477):
- Change the "View" button from `onClick` to `Link to='/course/digital-marketing'`
- Change the "Enroll" link from `to='/Enroll'` to `to='/course/digital-marketing'`

### Create Admin Account
You'll need to manually create an admin account in MongoDB:
```javascript
// In MongoDB shell or MongoDB Compass
db.users.insertOne({
  name: "Admin",
  email: "admin@digiquest.com",
  username: "admin",
  password: "$2a$10$hashed_password_here", // Hash this with bcrypt
  role: "admin",
  purchasedCourses: [],
  paymentDetails: [],
  createdAt: new Date()
})
```

Or create a temporary script to generate the admin account.

### Add Course Data
You need to add course data to MongoDB with proper structure. Each course should include:
- title, description, image, banner
- instructor, duration, language, level, price
- syllabus (array of modules with topics)
- features (array of strings)
- videos (array with title, description, url, duration, sequence)
- notes (array with title, fileUrl, fileType)
- demoVideo, faqs, studentBenefits
- category, isActive, enrolledCount

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

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment signature

### Dashboard
- `GET /api/dashboard` - Get dashboard data (protected)
- `GET /api/dashboard/my-courses` - Get user's courses (protected)
- `POST /api/dashboard/progress` - Update video progress (protected)

### Admin
- `GET /api/admin/stats` - Get admin statistics (admin only)
- `GET /api/admin/students` - Get all students (admin only)
- `GET /api/admin/courses` - Get all courses (admin only)
- `DELETE /api/admin/students/:id` - Delete student (admin only)

## 🔐 Security Features

- JWT authentication with 30-day expiry
- Password hashing with bcrypt (salt rounds: 10)
- Rate limiting (100 requests per 15 minutes)
- Helmet for security headers
- CORS configuration
- Input validation on all endpoints
- Protected routes for sensitive operations
- Role-based access control

## 🎨 UI Features

- Responsive design for mobile, tablet, and desktop
- Smooth animations with Framer Motion
- Loading spinners and skeleton loaders
- Toast notifications with react-toastify
- Modern dashboard with sidebar navigation
- Professional email templates
- Dark mode video learning interface

## 🚀 Deployment

### Backend Deployment
1. Deploy to Vercel, Railway, or Heroku
2. Set environment variables in deployment platform
3. Ensure MongoDB is accessible (Atlas recommended)
4. Update FRONTEND_URL to production URL

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Set environment variables in deployment platform
4. Update VITE_API_URL to production backend URL

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  mobile: String,
  role: String ('student' | 'admin'),
  purchasedCourses: [ObjectId],
  paymentDetails: [{
    courseId: ObjectId,
    paymentId: String,
    orderId: String,
    amount: Number,
    paymentStatus: String,
    enrolledAt: Date
  }],
  progress: Map,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Collection
```javascript
{
  title: String,
  description: String,
  image: String,
  banner: String,
  instructor: String,
  duration: String,
  language: String,
  level: String,
  price: Number,
  syllabus: [{ module: String, topics: [String] }],
  features: [String],
  videos: [{
    title: String,
    description: String,
    url: String,
    duration: String,
    sequence: Number,
    thumbnail: String
  }],
  notes: [{
    title: String,
    fileUrl: String,
    fileType: String
  }],
  numberOfVideos: Number,
  numberOfProjects: Number,
  demoVideo: String,
  faqs: [{ question: String, answer: String }],
  studentBenefits: [String],
  category: String,
  isActive: Boolean,
  enrolledCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Collection
```javascript
{
  userId: ObjectId,
  courseId: ObjectId,
  paymentId: String,
  orderId: String,
  amount: Number,
  paymentStatus: String,
  enrolledAt: Date,
  expiryDate: Date,
  progress: {
    completedVideos: [ObjectId],
    lastWatchedVideo: ObjectId,
    progressPercentage: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure MongoDB is running
- Verify all environment variables are set

### Payment verification fails
- Verify Razorpay keys are correct
- Check signature generation logic
- Ensure order ID matches

### Email not sending
- Check Gmail app password
- Verify email configuration
- Check firewall/network settings

### Frontend API errors
- Verify VITE_API_URL is correct
- Check CORS configuration
- Ensure backend is running

## 📝 Future Enhancements

The architecture is designed to support future features:
- Certificate generation
- Quiz and assessment system
- Live class integration
- Discussion forum
- Progress analytics
- Course reviews and ratings
- Wishlist functionality
- Coupon system
- Referral program
- Subscription plans
- Email verification
- Password reset
- Attendance tracking

## 📄 License

This project is proprietary to DigiQuest.

## 👥 Support

For support, contact support@digiquest.com
