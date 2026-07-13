import multer from 'multer';

/**
 * Multer Configuration for Cloudinary Uploads
 * Uses memory storage to keep files in buffer before uploading to Cloudinary
 */

// Storage configuration - stores files in memory
const storage = multer.memoryStorage();

// File size limits (in bytes)
const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024,      // 5 MB
  video: 100 * 1024 * 1024,    // 100 MB
  pdf: 20 * 1024 * 1024,       // 20 MB
  zip: 100 * 1024 * 1024,      // 100 MB
  docx: 10 * 1024 * 1024,      // 10 MB
  default: 100 * 1024 * 1024   // 100 MB default
};

// Allowed file types
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/quicktime', 'video/webm'],
  pdf: ['application/pdf'],
  zip: ['application/zip', 'application/x-zip-compressed'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

/**
 * File filter to validate file type and size
 */
const fileFilter = (req, file, cb) => {
  const fieldName = file.fieldname;
  const mimetype = file.mimetype;
  const size = file.size;

  // Determine file type based on field name
  let fileType;
  let maxSize;
  let allowedMimetypes;

  switch (fieldName) {
    case 'thumbnail':
    case 'image':
    case 'banner':
      fileType = 'image';
      maxSize = FILE_SIZE_LIMITS.image;
      allowedMimetypes = ALLOWED_TYPES.image;
      break;
    case 'previewVideo':
    case 'video':
      fileType = 'video';
      maxSize = FILE_SIZE_LIMITS.video;
      allowedMimetypes = ALLOWED_TYPES.video;
      break;
    case 'pdf':
    case 'coursePdf':
      fileType = 'pdf';
      maxSize = FILE_SIZE_LIMITS.pdf;
      allowedMimetypes = ALLOWED_TYPES.pdf;
      break;
    case 'zip':
    case 'courseZip':
      fileType = 'zip';
      maxSize = FILE_SIZE_LIMITS.zip;
      allowedMimetypes = ALLOWED_TYPES.zip;
      break;
    case 'docx':
    case 'courseDocx':
      fileType = 'docx';
      maxSize = FILE_SIZE_LIMITS.docx;
      allowedMimetypes = ALLOWED_TYPES.docx;
      break;
    default:
      // For course files array, detect from mimetype
      if (ALLOWED_TYPES.image.includes(mimetype)) {
        fileType = 'image';
        maxSize = FILE_SIZE_LIMITS.image;
        allowedMimetypes = ALLOWED_TYPES.image;
      } else if (ALLOWED_TYPES.video.includes(mimetype)) {
        fileType = 'video';
        maxSize = FILE_SIZE_LIMITS.video;
        allowedMimetypes = ALLOWED_TYPES.video;
      } else if (ALLOWED_TYPES.pdf.includes(mimetype)) {
        fileType = 'pdf';
        maxSize = FILE_SIZE_LIMITS.pdf;
        allowedMimetypes = ALLOWED_TYPES.pdf;
      } else if (ALLOWED_TYPES.zip.includes(mimetype)) {
        fileType = 'zip';
        maxSize = FILE_SIZE_LIMITS.zip;
        allowedMimetypes = ALLOWED_TYPES.zip;
      } else if (ALLOWED_TYPES.docx.includes(mimetype)) {
        fileType = 'docx';
        maxSize = FILE_SIZE_LIMITS.docx;
        allowedMimetypes = ALLOWED_TYPES.docx;
      } else {
        return cb(new Error(`Unsupported file type: ${mimetype}. Field: ${fieldName}`), false);
      }
  }

  // Validate file type
  if (!allowedMimetypes.includes(mimetype)) {
    return cb(
      new Error(
        `Invalid file type for ${fieldName}. Expected: ${allowedMimetypes.join(', ')}. Received: ${mimetype}`
      ),
      false
    );
  }

  // Validate file size
  if (size > maxSize) {
    return cb(
      new Error(
        `File size exceeds limit for ${fileType}. Maximum: ${maxSize / (1024 * 1024)}MB. Received: ${(size / (1024 * 1024)).toFixed(2)}MB`
      ),
      false
    );
  }

  cb(null, true);
};

// Multer instance for Cloudinary uploads
const uploadCloudinary = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: FILE_SIZE_LIMITS.video // Use video limit as maximum
  }
});

// Export specific upload configurations for different use cases

/**
 * Single file upload for thumbnail
 */
export const uploadThumbnailCloudinary = uploadCloudinary.single('thumbnail');

/**
 * Single file upload for banner
 */
export const uploadBannerCloudinary = uploadCloudinary.single('banner');

/**
 * Single file upload for preview video
 */
export const uploadPreviewVideoCloudinary = uploadCloudinary.single('previewVideo');

/**
 * Multiple file upload for course files (images, videos, PDFs, ZIPs, DOCX)
 */
export const uploadCourseFilesCloudinary = uploadCloudinary.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'previewVideo', maxCount: 1 },
  { name: 'courseFiles', maxCount: 10 }
]);

/**
 * Multiple file upload for learning content
 */
export const uploadLearningContentCloudinary = uploadCloudinary.fields([
  { name: 'video', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

/**
 * Multiple file upload for testimonials
 */
export const uploadTestimonialCloudinary = uploadCloudinary.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

/**
 * Generic multiple file upload
 */
export const uploadMultipleCloudinary = uploadCloudinary.array('files', 10);

export default uploadCloudinary;
