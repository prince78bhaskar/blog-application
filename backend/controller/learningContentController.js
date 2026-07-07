import LearningContent from '../model/LearningContent.js';
import Course from '../model/Course.js';
import User from '../model/User.js';

export const addLearningContent = async (req, res) => {
  try {
    const { courseId, title, type, videoUrl, pdfUrl, thumbnail, description, duration, sequence } = req.body;

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Validate type-specific fields
    if (type === 'video' && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Video URL is required for video content'
      });
    }

    if (type === 'note' && !pdfUrl) {
      return res.status(400).json({
        success: false,
        message: 'PDF URL is required for note content'
      });
    }

    // Get the highest sequence number for this course and type
    const lastContent = await LearningContent.findOne({ courseId, type })
      .sort({ sequence: -1 });
    
    const newSequence = sequence || (lastContent ? lastContent.sequence + 1 : 0);

    // FIX: Use req.user.userId to match JWT payload structure (not req.user.id)
    // The JWT payload contains { userId, username, role }, so we access the admin ID via req.user.userId
    const learningContent = await LearningContent.create({
      courseId,
      title,
      type,
      videoUrl: type === 'video' ? videoUrl : undefined,
      pdfUrl: type === 'note' ? pdfUrl : undefined,
      thumbnail,
      description,
      duration,
      sequence: newSequence,
      createdBy: req.user.userId
    });

    res.status(201).json({
      success: true,
      message: 'Learning content added successfully',
      learningContent
    });
  } catch (error) {
    console.error('Error adding learning content:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getLearningContentByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { type } = req.query;

    const query = { courseId };
    if (type) {
      query.type = type;
    }

    const learningContent = await LearningContent.find(query)
      .populate('createdBy', 'name email')
      .sort({ sequence: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      learningContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getLearningContentById = async (req, res) => {
  try {
    const learningContent = await LearningContent.findById(req.params.id)
      .populate('courseId', 'title')
      .populate('createdBy', 'name name');

    if (!learningContent) {
      return res.status(404).json({
        success: false,
        message: 'Learning content not found'
      });
    }

    res.status(200).json({
      success: true,
      learningContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateLearningContent = async (req, res) => {
  try {
    const { title, videoUrl, pdfUrl, thumbnail, description, duration, sequence } = req.body;

    const learningContent = await LearningContent.findById(req.params.id);

    if (!learningContent) {
      return res.status(404).json({
        success: false,
        message: 'Learning content not found'
      });
    }

    // Validate type-specific fields
    if (learningContent.type === 'video' && videoUrl === undefined && !learningContent.videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Video URL is required for video content'
      });
    }

    if (learningContent.type === 'note' && pdfUrl === undefined && !learningContent.pdfUrl) {
      return res.status(400).json({
        success: false,
        message: 'PDF URL is required for note content'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (description !== undefined) updateData.description = description;
    if (duration !== undefined) updateData.duration = duration;
    if (sequence !== undefined) updateData.sequence = sequence;

    const updatedContent = await LearningContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Learning content updated successfully',
      learningContent: updatedContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteLearningContent = async (req, res) => {
  try {
    const learningContent = await LearningContent.findByIdAndDelete(req.params.id);

    if (!learningContent) {
      return res.status(404).json({
        success: false,
        message: 'Learning content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Learning content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllLearningContent = async (req, res) => {
  try {
    const { courseId, type } = req.query;

    const query = {};
    if (courseId) query.courseId = courseId;
    if (type) query.type = type;

    const learningContent = await LearningContent.find(query)
      .populate('courseId', 'title')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      learningContent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
