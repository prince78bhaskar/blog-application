import User from '../model/User.js';
import Enrollment from '../model/Enrollment.js';

export const checkEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    // FIX: Use req.user.userId to match JWT payload structure (not req.user.id)
    const userId = req.user.userId;

    // Check if user is admin (admins can access all content)
    const user = await User.findById(userId);
    if (user.role === 'admin') {
      return next();
    }

    // Check if user has purchased the course
    const enrollment = await Enrollment.findOne({
      userId: userId,
      courseId: courseId,
      paymentStatus: 'completed'
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this course. Please enroll first.'
      });
    }

    // Check if enrollment has expired (if expiry date is set)
    if (enrollment.expiryDate && new Date() > enrollment.expiryDate) {
      return res.status(403).json({
        success: false,
        message: 'Your enrollment has expired. Please renew your subscription.'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
