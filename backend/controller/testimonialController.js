import Testimonial from '../model/Testimonial.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary
} from '../utils/cloudinaryUpload.js';

// Get all active testimonials (public)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all testimonials (admin - includes inactive)
export const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new testimonial (admin)
export const createTestimonial = async (req, res) => {
  try {
    console.log('========== CREATE TESTIMONIAL REQUEST ==========');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Safe req.body handling
    const body = req.body || {};
    const { studentName, courseName, designation, description, displayOrder, isActive } = body;

    // Handle video URL/upload
    const videoMode = body.videoMode || (req.files?.video ? 'upload' : 'url');
    let videoUrlFinal = '';
    let videoPublicId = '';

    if (videoMode === 'upload' && req.files?.video?.[0]) {
      const videoUpload = await uploadToCloudinary(
        req.files.video[0].buffer,
        req.files.video[0].mimetype,
        'DigiQuest/Testimonials/Videos'
      );
      videoUrlFinal = videoUpload.secure_url;
      videoPublicId = videoUpload.public_id;
    } else {
      videoUrlFinal = body.videoUrl || '';
      videoPublicId = '';
    }

    // Handle thumbnail URL/upload
    const thumbnailMode = body.thumbnailMode || (req.files?.thumbnail ? 'upload' : 'url');
    let thumbnailFinal = '';
    let thumbnailPublicId = '';

    if (thumbnailMode === 'upload' && req.files?.thumbnail?.[0]) {
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/Testimonials/Thumbnails'
      );
      thumbnailFinal = thumbnailUpload.secure_url;
      thumbnailPublicId = thumbnailUpload.public_id;
    } else {
      thumbnailFinal = body.thumbnail || '';
      thumbnailPublicId = '';
    }

    // Validation
    if (!studentName || !courseName || !videoUrlFinal) {
      return res.status(400).json({
        success: false,
        message: 'Student name, course name, and video URL are required'
      });
    }

    const testimonial = await Testimonial.create({
      studentName,
      courseName,
      designation,
      description,
      videoUrl: videoUrlFinal,
      videoPublicId,
      thumbnail: thumbnailFinal,
      thumbnailPublicId,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    console.log('Testimonial created successfully:', testimonial);

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      testimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update testimonial (admin)
export const updateTestimonial = async (req, res) => {
  try {
    console.log('========== UPDATE TESTIMONIAL REQUEST ==========');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Safe req.body handling
    const body = req.body || {};
    const { studentName, courseName, designation, description, displayOrder, isActive } = body;

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    const updateData = {};
    if (studentName !== undefined) updateData.studentName = studentName;
    if (courseName !== undefined) updateData.courseName = courseName;
    if (designation !== undefined) updateData.designation = designation;
    if (description !== undefined) updateData.description = description;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Handle video URL/upload
    const videoMode = body.videoMode || (req.files?.video?.length ? 'upload' : 'url');
    
    if (videoMode === 'upload' && req.files?.video?.[0]) {
      // Delete old Cloudinary video if exists
      if (testimonial.videoPublicId) {
        try {
          await deleteFromCloudinary(testimonial.videoPublicId, 'video');
        } catch (error) {
          console.error('Error deleting old video:', error);
        }
      }
      
      const videoUpload = await uploadToCloudinary(
        req.files.video[0].buffer,
        req.files.video[0].mimetype,
        'DigiQuest/Testimonials/Videos'
      );
      updateData.videoUrl = videoUpload.secure_url;
      updateData.videoPublicId = videoUpload.public_id;
    } else if (videoMode === 'url') {
      // Switching from upload to URL - delete old Cloudinary file
      if (testimonial.videoPublicId) {
        try {
          await deleteFromCloudinary(testimonial.videoPublicId, 'video');
        } catch (error) {
          console.error('Error deleting old video:', error);
        }
      }
      updateData.videoUrl = body.videoUrl || testimonial.videoUrl;
      updateData.videoPublicId = '';
    }

    // Handle thumbnail URL/upload
    const thumbnailMode = body.thumbnailMode || (req.files?.thumbnail?.length ? 'upload' : 'url');
    
    if (thumbnailMode === 'upload' && req.files?.thumbnail?.[0]) {
      // Delete old Cloudinary thumbnail if exists
      if (testimonial.thumbnailPublicId) {
        try {
          await deleteFromCloudinary(testimonial.thumbnailPublicId, 'image');
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }
      
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/Testimonials/Thumbnails'
      );
      updateData.thumbnail = thumbnailUpload.secure_url;
      updateData.thumbnailPublicId = thumbnailUpload.public_id;
    } else if (thumbnailMode === 'url') {
      // Switching from upload to URL - delete old Cloudinary file
      if (testimonial.thumbnailPublicId) {
        try {
          await deleteFromCloudinary(testimonial.thumbnailPublicId, 'image');
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }
      updateData.thumbnail = body.thumbnail || testimonial.thumbnail;
      updateData.thumbnailPublicId = '';
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Testimonial updated successfully:', updatedTestimonial);

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete testimonial (admin)
export const deleteTestimonial = async (req, res) => {
  try {
    console.log('========== DELETE TESTIMONIAL REQUEST ==========');
    console.log('Testimonial ID:', req.params.id);

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Delete Cloudinary files if they exist
    const filesToDelete = [];

    if (testimonial.videoPublicId) {
      filesToDelete.push({ publicId: testimonial.videoPublicId, resourceType: 'video' });
    }
    if (testimonial.thumbnailPublicId) {
      filesToDelete.push({ publicId: testimonial.thumbnailPublicId, resourceType: 'image' });
    }

    // Delete files from Cloudinary
    if (filesToDelete.length > 0) {
      try {
        console.log(`Deleting ${filesToDelete.length} files from Cloudinary...`);
        await Promise.all(
          filesToDelete.map(file => deleteFromCloudinary(file.publicId, file.resourceType))
        );
        console.log('All files deleted from Cloudinary successfully');
      } catch (error) {
        console.error('Error deleting files from Cloudinary:', error);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    // Delete from MongoDB
    await Testimonial.findByIdAndDelete(req.params.id);

    console.log('Testimonial deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
