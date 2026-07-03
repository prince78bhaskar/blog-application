import User from '../model/User.js';
import Course from '../model/Course.js';
import Enrollment from '../model/Enrollment.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const totalRevenue = await Enrollment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentEnrollments = await Enrollment.find()
      .populate('userId', 'name email')
      .populate('courseId', 'title')
      .sort({ enrolledAt: -1 })
      .limit(10);

    const recentStudents = await User.find({ role: 'student' })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalEnrollments,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentEnrollments,
      recentStudents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search 
      ? { 
          role: 'student',
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { username: { $regex: search, $options: 'i' } }
          ]
        }
      : { role: 'student' };

    const students = await User.find(query)
      .populate('purchasedCourses', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllCoursesAdmin = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search 
      ? { 
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const courses = await Course.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await Enrollment.deleteMany({ userId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
