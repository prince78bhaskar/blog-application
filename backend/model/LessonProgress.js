import mongoose from 'mongoose';

/**
 * LessonProgress Model
 * 
 * This model tracks the completion status of individual lessons (videos and notes)
 * for a student within a course. It ensures students cannot skip lessons and
 * provides granular progress tracking.
 * 
 * Schema:
 * - studentId: Reference to the User (student)
 * - courseId: Reference to the Course
 * - lessonId: Reference to the LearningContent (video or note)
 * - completed: Boolean flag indicating if the lesson is completed
 * - completedAt: Timestamp when the lesson was marked as completed
 * 
 * Unique Index: (studentId, lessonId) - Prevents duplicate completion records
 */
const lessonProgressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningContent',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Unique index to prevent duplicate completion records for the same student and lesson
lessonProgressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });

// Compound index for efficient queries by student and course
lessonProgressSchema.index({ studentId: 1, courseId: 1 });

const LessonProgress = mongoose.model('LessonProgress', lessonProgressSchema);

export default LessonProgress;
