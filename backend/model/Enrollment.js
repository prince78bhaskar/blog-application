import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  progress: {
    completedVideos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course.videos'
    }],
    lastWatchedVideo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course.videos'
    },
    progressPercentage: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
