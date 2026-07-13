import mongoose from 'mongoose';

const learningContentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['video', 'note'],
    required: true
  },
  videoUrl: {
    type: String,
    trim: true
  },
  videoPublicId: {
    type: String,
    trim: true
  },
  pdfUrl: {
    type: String,
    trim: true
  },
  pdfPublicId: {
    type: String,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  },
  thumbnailPublicId: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  sequence: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

learningContentSchema.index({ courseId: 1, type: 1, sequence: 1 });

const LearningContent = mongoose.model('LearningContent', learningContentSchema);

export default LearningContent;
