import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    required: true
  },
  thumbnail: String
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'zip', 'doc'],
    required: true
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'English'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  syllabus: [{
    module: String,
    topics: [String]
  }],
  features: [String],
  videos: [videoSchema],
  notes: [noteSchema],
  numberOfVideos: {
    type: Number,
    default: 0
  },
  numberOfProjects: {
    type: Number,
    default: 0
  },
  demoVideo: String,
  faqs: [{
    question: String,
    answer: String
  }],
  studentBenefits: [String],
  category: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

courseSchema.pre('save', function(next) {
  if (this.videos) {
    this.numberOfVideos = this.videos.length;
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
