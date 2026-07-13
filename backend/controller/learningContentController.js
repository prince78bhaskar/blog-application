import LearningContent from '../model/LearningContent.js';
import Course from '../model/Course.js';
import User from '../model/User.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary
} from '../utils/cloudinaryUpload.js';

export const addLearningContent = async (req, res) => {
  try {
    console.log('========== ADD LEARNING CONTENT REQUEST ==========');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Safe req.body handling
    const body = req.body || {};
    const { courseId, title, type, videoUrl, pdfUrl, thumbnail, description, duration, sequence } = body;

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Handle video URL/upload
    const videoMode = req.body.videoMode || (req.files?.video ? 'upload' : 'url');
    let videoUrlFinal = '';
    let videoPublicId = '';
    
    if (type === 'video') {
      if (videoMode === 'upload' && req.files?.video?.[0]) {
        const videoUpload = await uploadToCloudinary(
          req.files.video[0].buffer,
          req.files.video[0].mimetype,
          'DigiQuest/LearningContent/Videos'
        );
        videoUrlFinal = videoUpload.secure_url;
        videoPublicId = videoUpload.public_id;
      } else {
        videoUrlFinal = videoUrl || '';
        videoPublicId = '';
      }
    }

    // Handle PDF URL/upload
    const pdfMode = req.body.pdfMode || (req.files?.pdf ? 'upload' : 'url');
    let pdfUrlFinal = '';
    let pdfPublicId = '';
    
    if (type === 'note') {
      if (pdfMode === 'upload' && req.files?.pdf?.[0]) {
        const pdfUpload = await uploadToCloudinary(
          req.files.pdf[0].buffer,
          req.files.pdf[0].mimetype,
          'DigiQuest/LearningContent/PDFs'
        );
        pdfUrlFinal = pdfUpload.secure_url;
        pdfPublicId = pdfUpload.public_id;
      } else {
        pdfUrlFinal = pdfUrl || '';
        pdfPublicId = '';
      }
    }

    // Handle thumbnail URL/upload
    const thumbnailMode = req.body.thumbnailMode || (req.files?.thumbnail ? 'upload' : 'url');
    let thumbnailFinal = '';
    let thumbnailPublicId = '';
    
    if (thumbnailMode === 'upload' && req.files?.thumbnail?.[0]) {
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/LearningContent/Thumbnails'
      );
      thumbnailFinal = thumbnailUpload.secure_url;
      thumbnailPublicId = thumbnailUpload.public_id;
    } else {
      thumbnailFinal = thumbnail || '';
      thumbnailPublicId = '';
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
      videoUrl: type === 'video' ? videoUrlFinal : undefined,
      videoPublicId: type === 'video' ? videoPublicId : undefined,
      pdfUrl: type === 'note' ? pdfUrlFinal : undefined,
      pdfPublicId: type === 'note' ? pdfPublicId : undefined,
      thumbnail: thumbnailFinal,
      thumbnailPublicId,
      description,
      duration,
      sequence: newSequence,
      createdBy: req.user.userId
    });

    console.log('Learning content created successfully:', learningContent);

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
    console.log('========== UPDATE LEARNING CONTENT REQUEST ==========');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Safe req.body handling
    const body = req.body || {};
    const { title, videoUrl, pdfUrl, thumbnail, description, duration, sequence } = body;

    const learningContent = await LearningContent.findById(req.params.id);

    if (!learningContent) {
      return res.status(404).json({
        success: false,
        message: 'Learning content not found'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (duration !== undefined) updateData.duration = duration;
    if (sequence !== undefined) updateData.sequence = sequence;

    // Handle video URL/upload
    if (learningContent.type === 'video') {
      const videoMode = req.body.videoMode || (req.files?.video?.length ? 'upload' : 'url');
      
      if (videoMode === 'upload' && req.files?.video?.[0]) {
        // Delete old Cloudinary video if exists
        if (learningContent.videoPublicId) {
          try {
            await deleteFromCloudinary(learningContent.videoPublicId, 'video');
          } catch (error) {
            console.error('Error deleting old video:', error);
          }
        }
        
        const videoUpload = await uploadToCloudinary(
          req.files.video[0].buffer,
          req.files.video[0].mimetype,
          'DigiQuest/LearningContent/Videos'
        );
        updateData.videoUrl = videoUpload.secure_url;
        updateData.videoPublicId = videoUpload.public_id;
      } else if (videoMode === 'url') {
        // Switching from upload to URL - delete old Cloudinary file
        if (learningContent.videoPublicId) {
          try {
            await deleteFromCloudinary(learningContent.videoPublicId, 'video');
          } catch (error) {
            console.error('Error deleting old video:', error);
          }
        }
        updateData.videoUrl = videoUrl || learningContent.videoUrl;
        updateData.videoPublicId = '';
      }
    }

    // Handle PDF URL/upload
    if (learningContent.type === 'note') {
      const pdfMode = req.body.pdfMode || (req.files?.pdf?.length ? 'upload' : 'url');
      
      if (pdfMode === 'upload' && req.files?.pdf?.[0]) {
        // Delete old Cloudinary PDF if exists
        if (learningContent.pdfPublicId) {
          try {
            await deleteFromCloudinary(learningContent.pdfPublicId, 'raw');
          } catch (error) {
            console.error('Error deleting old PDF:', error);
          }
        }
        
        const pdfUpload = await uploadToCloudinary(
          req.files.pdf[0].buffer,
          req.files.pdf[0].mimetype,
          'DigiQuest/LearningContent/PDFs'
        );
        updateData.pdfUrl = pdfUpload.secure_url;
        updateData.pdfPublicId = pdfUpload.public_id;
      } else if (pdfMode === 'url') {
        // Switching from upload to URL - delete old Cloudinary file
        if (learningContent.pdfPublicId) {
          try {
            await deleteFromCloudinary(learningContent.pdfPublicId, 'raw');
          } catch (error) {
            console.error('Error deleting old PDF:', error);
          }
        }
        updateData.pdfUrl = pdfUrl || learningContent.pdfUrl;
        updateData.pdfPublicId = '';
      }
    }

    // Handle thumbnail URL/upload
    const thumbnailMode = req.body.thumbnailMode || (req.files?.thumbnail?.length ? 'upload' : 'url');
    
    if (thumbnailMode === 'upload' && req.files?.thumbnail?.[0]) {
      // Delete old Cloudinary thumbnail if exists
      if (learningContent.thumbnailPublicId) {
        try {
          await deleteFromCloudinary(learningContent.thumbnailPublicId, 'image');
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }
      
      const thumbnailUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        req.files.thumbnail[0].mimetype,
        'DigiQuest/LearningContent/Thumbnails'
      );
      updateData.thumbnail = thumbnailUpload.secure_url;
      updateData.thumbnailPublicId = thumbnailUpload.public_id;
    } else if (thumbnailMode === 'url') {
      // Switching from upload to URL - delete old Cloudinary file
      if (learningContent.thumbnailPublicId) {
        try {
          await deleteFromCloudinary(learningContent.thumbnailPublicId, 'image');
        } catch (error) {
          console.error('Error deleting old thumbnail:', error);
        }
      }
      updateData.thumbnail = thumbnail || learningContent.thumbnail;
      updateData.thumbnailPublicId = '';
    }

    const updatedContent = await LearningContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    console.log('Learning content updated successfully:', updatedContent);

    res.status(200).json({
      success: true,
      message: 'Learning content updated successfully',
      learningContent: updatedContent
    });
  } catch (error) {
    console.error('Error updating learning content:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteLearningContent = async (req, res) => {
  try {
    console.log('========== DELETE LEARNING CONTENT REQUEST ==========');
    console.log('Content ID:', req.params.id);

    const learningContent = await LearningContent.findById(req.params.id);

    if (!learningContent) {
      return res.status(404).json({
        success: false,
        message: 'Learning content not found'
      });
    }

    // Delete Cloudinary files if they exist
    const filesToDelete = [];

    if (learningContent.videoPublicId) {
      filesToDelete.push({ publicId: learningContent.videoPublicId, resourceType: 'video' });
    }
    if (learningContent.pdfPublicId) {
      filesToDelete.push({ publicId: learningContent.pdfPublicId, resourceType: 'raw' });
    }
    if (learningContent.thumbnailPublicId) {
      filesToDelete.push({ publicId: learningContent.thumbnailPublicId, resourceType: 'image' });
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
    await LearningContent.findByIdAndDelete(req.params.id);

    console.log('Learning content deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Learning content deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting learning content:', error);
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
