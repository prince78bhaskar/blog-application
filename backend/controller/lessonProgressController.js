import LessonProgress from '../model/LessonProgress.js';

/**
 * Mark a lesson as completed
 * 
 * POST /api/lesson-progress/complete
 * 
 * Request body:
 * {
 *   lessonId: string (required) - ID of the lesson (LearningContent)
 *   courseId: string (required) - ID of the course
 * }
 * 
 * This endpoint:
 * - Creates or updates a lesson progress record
 * - Prevents duplicate records using unique index
 * - Updates the Enrollment progress as well
 */
export const markLessonComplete = async (req, res) => {
  console.log('=== MARK LESSON COMPLETE CONTROLLER HIT ===');
  console.log('Request body:', req.body);
  console.log('User from auth:', req.user);
  
  try {
    const { lessonId, courseId } = req.body;
    const studentId = req.user.id; // From auth middleware

    console.log('Extracted - lessonId:', lessonId, 'courseId:', courseId, 'studentId:', studentId);

    if (!lessonId || !courseId) {
      console.log('Validation failed: missing lessonId or courseId');
      return res.status(400).json({
        success: false,
        message: 'lessonId and courseId are required'
      });
    }

    // Use findOneAndUpdate with upsert to handle both create and update
    // This prevents duplicate records due to the unique index
    console.log('Attempting to find and update lesson progress...');
    const lessonProgress = await LessonProgress.findOneAndUpdate(
      { studentId, lessonId },
      {
        studentId,
        courseId,
        lessonId,
        completed: true,
        completedAt: new Date()
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    console.log('Lesson progress updated:', lessonProgress);

    // Also update the Enrollment progress to include this lesson
    // This maintains backward compatibility with existing progress tracking
    console.log('Updating enrollment progress...');
    const Enrollment = (await import('../model/Enrollment.js')).default;
    await Enrollment.findOneAndUpdate(
      { userId: studentId, courseId },
      {
        $addToSet: { 'progress.completedVideos': lessonId },
        $set: { 'progress.lastWatchedVideo': lessonId }
      }
    );

    console.log('Enrollment progress updated successfully');

    res.status(200).json({
      success: true,
      message: 'Lesson marked as completed',
      data: lessonProgress
    });
  } catch (error) {
    console.error('Error marking lesson complete:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Handle duplicate key error (lesson already completed)
    if (error.code === 11000) {
      console.log('Duplicate key error - lesson already completed');
      return res.status(200).json({
        success: true,
        message: 'Lesson already completed',
        data: await LessonProgress.findOne({
          studentId: req.user.id,
          lessonId: req.body.lessonId
        })
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to mark lesson as completed',
      error: error.message
    });
  }
};

/**
 * Get all lesson progress for a student in a course
 * 
 * GET /api/lesson-progress/:courseId
 * 
 * This endpoint:
 * - Returns all completed lessons for the student in the given course
 * - Used to determine which lessons are completed on page load
 */
export const getLessonProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id; // From auth middleware

    const progress = await LessonProgress.find({
      studentId,
      courseId,
      completed: true
    }).select('lessonId completed completedAt');

    // Return as an array of lesson IDs for easier frontend usage
    const completedLessonIds = progress.map(p => p.lessonId.toString());

    res.status(200).json({
      success: true,
      data: {
        completedLessons: progress,
        completedLessonIds
      }
    });
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lesson progress',
      error: error.message
    });
  }
};

/**
 * Check if a specific lesson is completed
 * 
 * GET /api/lesson-progress/check/:lessonId
 * 
 * This endpoint:
 * - Returns the completion status of a specific lesson
 * - Used to check if a lesson is completed before enabling the Next button
 */
export const checkLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user.id; // From auth middleware

    const progress = await LessonProgress.findOne({
      studentId,
      lessonId
    });

    res.status(200).json({
      success: true,
      data: {
        completed: progress ? progress.completed : false,
        completedAt: progress ? progress.completedAt : null
      }
    });
  } catch (error) {
    console.error('Error checking lesson completion:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check lesson completion',
      error: error.message
    });
  }
};
