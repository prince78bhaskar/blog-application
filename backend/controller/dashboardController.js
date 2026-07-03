import User from '../model/User.js';
import Course from '../model/Course.js';
import Enrollment from '../model/Enrollment.js';

export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('purchasedCourses')
      .select('-password');

    const enrollments = await Enrollment.find({ userId: req.user.userId })
      .populate('courseId')
      .sort({ enrolledAt: -1 });

    const totalCourses = user.purchasedCourses.length;
    const totalSpent = user.paymentDetails.reduce((sum, payment) => sum + payment.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        user,
        enrollments,
        totalCourses,
        totalSpent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('purchasedCourses');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      courses: user.purchasedCourses
    });
  } catch (error) {
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
