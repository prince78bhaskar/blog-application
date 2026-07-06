import User from '../model/User.js';
import Course from '../model/Course.js';
import Enrollment from '../model/Enrollment.js';

export const getDashboardData = async (req, res) => {
  try {
    console.log('=== DASHBOARD DATA DEBUG ===');
    console.log('Request user ID:', req.user.userId);

    const user = await User.findById(req.user.userId)
      .populate('purchasedCourses')
      .select('-password');

    console.log('User found:', !!user);
    console.log('User purchasedCourses:', user?.purchasedCourses);
    console.log('User purchasedCourses length:', user?.purchasedCourses?.length || 0);
    console.log('User paymentDetails:', user?.paymentDetails);
    console.log('User full object:', JSON.stringify(user, null, 2));

    const enrollments = await Enrollment.find({ userId: req.user.userId })
      .populate('courseId')
      .sort({ enrolledAt: -1 });

    console.log('Enrollments found:', enrollments.length);
    console.log('Enrollments:', JSON.stringify(enrollments, null, 2));

    const totalCourses = user.purchasedCourses ? user.purchasedCourses.length : 0;
    const totalSpent = user.paymentDetails ? user.paymentDetails.reduce((sum, payment) => sum + (payment.amount || 0), 0) : 0;

    console.log('Total Courses calculated:', totalCourses);
    console.log('Total Spent calculated:', totalSpent);

    const responseData = {
      success: true,
      data: {
        user,
        enrollments,
        totalCourses,
        totalSpent
      }
    };

    console.log('Complete response being sent:', JSON.stringify(responseData, null, 2));

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Dashboard data error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    console.log('=== GET MY COURSES DEBUG ===');
    console.log('Request user ID:', req.user.userId);

    const user = await User.findById(req.user.userId)
      .populate('purchasedCourses');

    console.log('User found:', !!user);
    console.log('User purchasedCourses:', user?.purchasedCourses);
    console.log('User purchasedCourses length:', user?.purchasedCourses?.length || 0);
    console.log('User full object:', JSON.stringify(user, null, 2));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const response = {
      success: true,
      courses: user.purchasedCourses || []
    };

    console.log('Response being sent:', JSON.stringify(response, null, 2));

    res.status(200).json(response);
  } catch (error) {
    console.error('Get my courses error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { courseId, videoId, completed } = req.body;
    const userId = req.user.userId;

    const enrollment = await Enrollment.findOne({ userId, courseId });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    if (completed) {
      if (!enrollment.progress.completedVideos.includes(videoId)) {
        enrollment.progress.completedVideos.push(videoId);
      }
    }

    enrollment.progress.lastWatchedVideo = videoId;
    
    const course = await Course.findById(courseId);
    const totalVideos = course.videos.length;
    const completedCount = enrollment.progress.completedVideos.length;
    enrollment.progress.progressPercentage = Math.round((completedCount / totalVideos) * 100);

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated',
      progress: enrollment.progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
