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
  publicId: {
    type: String,
    required: true
  },
  resourceType: {
    type: String,
    default: 'video'
  },
  duration: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    required: true
  },
  thumbnail: String,
  thumbnailPublicId: String
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
  publicId: {
    type: String,
    required: true
  },
  resourceType: {
    type: String,
    default: 'raw'
  },
  fileType: {
    type: String,
    enum: ['pdf', 'zip', 'doc', 'docx'],
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
  imagePublicId: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  bannerPublicId: {
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
  demoVideoPublicId: String,
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


const Course = mongoose.model('Course', courseSchema);

export default Course;
