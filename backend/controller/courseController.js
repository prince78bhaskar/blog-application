import Course from '../model/Course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .select('-videos -notes')
      .sort({ createdAt: -1 });

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

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    console.log('========== CREATE COURSE REQUEST ==========');
    console.log('Request body:', req.body);
    console.log('Request user (from auth middleware):', req.user);

    const course = await Course.create(req.body);

    console.log('Course created successfully:', course);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('========== CREATE COURSE ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    if (error.name === 'ValidationError') {
      console.error('Validation errors:', Object.values(error.errors).map(e => e.message));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCourseVideos = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('videos');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      videos: course.videos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCourseNotes = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('notes');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      notes: course.notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
