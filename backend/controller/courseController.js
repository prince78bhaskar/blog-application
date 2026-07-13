import Course from '../model/Course.js';
import {
  uploadToCloudinary,
  uploadCourseFiles,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary
} from '../utils/cloudinaryUpload.js';

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
    console.log('Request files:', req.files);

    const {
      title,
      description,
      instructor,
      duration,
      language,
      level,
      price,
      category,
      syllabus,
      features,
      videos,
      notes,
      numberOfVideos,
      numberOfProjects,
      demoVideoUrl,
      faqs,
      studentBenefits
    } = req.body;

    // Parse JSON fields if they're strings
    const parsedSyllabus = typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus;
    const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
    const parsedVideos = typeof videos === 'string' ? JSON.parse(videos) : videos;
    const parsedNotes = typeof notes === 'string' ? JSON.parse(notes) : notes;
    const parsedFaqs = typeof faqs === 'string' ? JSON.parse(faqs) : faqs;
    const parsedStudentBenefits = typeof studentBenefits === 'string' ? JSON.parse(studentBenefits) : studentBenefits;

    // Upload thumbnail to Cloudinary
    let imagePublicId = null;
    let imageUrl = '';
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/Courses/Thumbnails'
      );
      imageUrl = thumbnailUpload.secure_url;
      imagePublicId = thumbnailUpload.public_id;
    } else if (req.body.thumbnail) {
      // If thumbnail URL is provided directly (for backward compatibility)
      imageUrl = req.body.thumbnail;
      imagePublicId = req.body.imagePublicId || '';
    }

    // Upload banner to Cloudinary
    let bannerPublicId = null;
    let bannerUrl = '';
    if (req.files && req.files.banner && req.files.banner[0]) {
      const bannerUpload = await uploadToCloudinary(
        req.files.banner[0].buffer,
        req.files.banner[0].mimetype,
        'DigiQuest/Courses/Banners'
      );
      bannerUrl = bannerUpload.secure_url;
      bannerPublicId = bannerUpload.public_id;
    } else if (req.body.banner) {
      bannerUrl = req.body.banner;
      bannerPublicId = req.body.bannerPublicId || '';
    }

    // Upload demo video to Cloudinary
    let demoVideoPublicId = null;
    let demoVideoUrl = '';
    if (req.files && req.files.previewVideo && req.files.previewVideo[0]) {
      const demoVideoUpload = await uploadToCloudinary(
        req.files.previewVideo[0].buffer,
        req.files.previewVideo[0].mimetype,
        'DigiQuest/Courses/DemoVideos'
      );
      demoVideoUrl = demoVideoUpload.secure_url;
      demoVideoPublicId = demoVideoUpload.public_id;
    } else if (req.body.demoVideo) {
      demoVideoUrl = req.body.demoVideo;
      demoVideoPublicId = req.body.demoVideoPublicId || '';
    }

    // Upload course files (PDFs, ZIPs, DOCX) and add to notes
    let courseNotes = parsedNotes || [];
    if (req.files && req.files.courseFiles && req.files.courseFiles.length > 0) {
      const uploadedFiles = await uploadCourseFiles(
        req.files.courseFiles.map(file => ({
          buffer: file.buffer,
          mimetype: file.mimetype,
          originalname: file.originalname,
          title: file.originalname
        })),
        'DigiQuest/Courses/Files'
      );

      // Add uploaded files to notes
      courseNotes = [
        ...courseNotes,
        ...uploadedFiles.map(file => ({
          title: file.title,
          fileUrl: file.fileUrl,
          publicId: file.publicId,
          resourceType: file.resourceType,
          fileType: file.fileType
        }))
      ];
    }

    // Create course with Cloudinary URLs
    const course = await Course.create({
      title,
      description,
      image: imageUrl,
      imagePublicId,
      banner: bannerUrl,
      bannerPublicId,
      instructor,
      duration,
      language,
      level,
      price,
      syllabus: parsedSyllabus,
      features: parsedFeatures,
      videos: parsedVideos || [],
      notes: courseNotes,
      numberOfVideos: numberOfVideos || 0,
      numberOfProjects: numberOfProjects || 0,
      demoVideo: demoVideoUrl,
      demoVideoPublicId,
      faqs: parsedFaqs || [],
      studentBenefits: parsedStudentBenefits || [],
      category,
      isActive: true
    });

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
    console.log('========== UPDATE COURSE REQUEST ==========');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Find existing course
    const existingCourse = await Course.findById(req.params.id);

    if (!existingCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const updateData = { ...req.body };

    // Parse JSON fields if they're strings
    if (updateData.syllabus && typeof updateData.syllabus === 'string') {
      updateData.syllabus = JSON.parse(updateData.syllabus);
    }
    if (updateData.features && typeof updateData.features === 'string') {
      updateData.features = JSON.parse(updateData.features);
    }
    if (updateData.videos && typeof updateData.videos === 'string') {
      updateData.videos = JSON.parse(updateData.videos);
    }
    if (updateData.notes && typeof updateData.notes === 'string') {
      updateData.notes = JSON.parse(updateData.notes);
    }
    if (updateData.faqs && typeof updateData.faqs === 'string') {
      updateData.faqs = JSON.parse(updateData.faqs);
    }
    if (updateData.studentBenefits && typeof updateData.studentBenefits === 'string') {
      updateData.studentBenefits = JSON.parse(updateData.studentBenefits);
    }

    // Handle thumbnail replacement
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      // Delete old thumbnail from Cloudinary
      if (existingCourse.imagePublicId) {
        try {
          await deleteFromCloudinary(existingCourse.imagePublicId, 'image');
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }

      // Upload new thumbnail
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/Courses/Thumbnails'
      );
      updateData.image = thumbnailUpload.secure_url;
      updateData.imagePublicId = thumbnailUpload.public_id;
    }

    // Handle banner replacement
    if (req.files && req.files.banner && req.files.banner[0]) {
      // Delete old banner from Cloudinary
      if (existingCourse.bannerPublicId) {
        try {
          await deleteFromCloudinary(existingCourse.bannerPublicId, 'image');
        } catch (error) {
          console.error('Error deleting old banner:', error);
        }
      }

      // Upload new banner
      const bannerUpload = await uploadToCloudinary(
        req.files.banner[0].buffer,
        req.files.banner[0].mimetype,
        'DigiQuest/Courses/Banners'
      );
      updateData.banner = bannerUpload.secure_url;
      updateData.bannerPublicId = bannerUpload.public_id;
    }

    // Handle demo video replacement
    if (req.files && req.files.previewVideo && req.files.previewVideo[0]) {
      // Delete old demo video from Cloudinary
      if (existingCourse.demoVideoPublicId) {
        try {
          await deleteFromCloudinary(existingCourse.demoVideoPublicId, 'video');
        } catch (error) {
          console.error('Error deleting old demo video:', error);
        }
      }

      // Upload new demo video
      const demoVideoUpload = await uploadToCloudinary(
        req.files.previewVideo[0].buffer,
        req.files.previewVideo[0].mimetype,
        'DigiQuest/Courses/DemoVideos'
      );
      updateData.demoVideo = demoVideoUpload.secure_url;
      updateData.demoVideoPublicId = demoVideoUpload.public_id;
    }

    // Handle course files (PDFs, ZIPs, DOCX)
    if (req.files && req.files.courseFiles && req.files.courseFiles.length > 0) {
      const uploadedFiles = await uploadCourseFiles(
        req.files.courseFiles.map(file => ({
          buffer: file.buffer,
          mimetype: file.mimetype,
          originalname: file.originalname,
          title: file.originalname
        })),
        'DigiQuest/Courses/Files'
      );

      // Add uploaded files to existing notes
      const existingNotes = updateData.notes || existingCourse.notes || [];
      updateData.notes = [
        ...existingNotes,
        ...uploadedFiles.map(file => ({
          title: file.title,
          fileUrl: file.fileUrl,
          publicId: file.publicId,
          resourceType: file.resourceType,
          fileType: file.fileType
        }))
      ];
    }

    // Update course
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Course updated successfully:', course);

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('========== UPDATE COURSE ERROR ==========');
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

export const deleteCourse = async (req, res) => {
  try {
    console.log('========== DELETE COURSE REQUEST ==========');
    console.log('Course ID:', req.params.id);

    // Find course before deletion
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Collect all Cloudinary public IDs to delete
    const filesToDelete = [];

    // Add thumbnail
    if (course.imagePublicId) {
      filesToDelete.push({ publicId: course.imagePublicId, resourceType: 'image' });
    }

    // Add banner
    if (course.bannerPublicId) {
      filesToDelete.push({ publicId: course.bannerPublicId, resourceType: 'image' });
    }

    // Add demo video
    if (course.demoVideoPublicId) {
      filesToDelete.push({ publicId: course.demoVideoPublicId, resourceType: 'video' });
    }

    // Add videos
    if (course.videos && course.videos.length > 0) {
      course.videos.forEach(video => {
        if (video.publicId) {
          filesToDelete.push({ publicId: video.publicId, resourceType: video.resourceType || 'video' });
        }
        if (video.thumbnailPublicId) {
          filesToDelete.push({ publicId: video.thumbnailPublicId, resourceType: 'image' });
        }
      });
    }

    // Add notes/files
    if (course.notes && course.notes.length > 0) {
      course.notes.forEach(note => {
        if (note.publicId) {
          filesToDelete.push({ publicId: note.publicId, resourceType: note.resourceType || 'raw' });
        }
      });
    }

    // Delete all files from Cloudinary
    if (filesToDelete.length > 0) {
      try {
        console.log(`Deleting ${filesToDelete.length} files from Cloudinary...`);
        await deleteMultipleFromCloudinary(filesToDelete);
        console.log('All files deleted from Cloudinary successfully');
      } catch (error) {
        console.error('Error deleting files from Cloudinary:', error);
        // Continue with course deletion even if Cloudinary deletion fails
      }
    }

    // Delete course from MongoDB
    await Course.findByIdAndDelete(req.params.id);

    console.log('Course deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('========== DELETE COURSE ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

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
