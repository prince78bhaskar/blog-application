import Testimonial from '../model/Testimonial.js';

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
    const { studentName, courseName, designation, description, displayOrder, isActive } = req.body;

    // Handle file uploads
    let videoUrl = req.body.videoUrl;
    let thumbnail = req.body.thumbnail;

    if (req.files && req.files.video) {
      videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    }

    if (req.files && req.files.thumbnail) {
      thumbnail = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
    }

    // Validation
    if (!studentName || !courseName || !videoUrl) {
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
      videoUrl,
      thumbnail,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update testimonial (admin)
export const updateTestimonial = async (req, res) => {
  try {
    const { studentName, courseName, designation, description, displayOrder, isActive } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Handle file uploads
    if (req.files && req.files.video) {
      testimonial.videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    }

    if (req.files && req.files.thumbnail) {
      testimonial.thumbnail = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
    }

    // Update fields
    if (studentName) testimonial.studentName = studentName;
    if (courseName) testimonial.courseName = courseName;
    if (designation !== undefined) testimonial.designation = designation;
    if (description !== undefined) testimonial.description = description;
    if (req.body.videoUrl && !req.files?.video) testimonial.videoUrl = req.body.videoUrl;
    if (req.body.thumbnail !== undefined && !req.files?.thumbnail) testimonial.thumbnail = req.body.thumbnail;
    if (displayOrder !== undefined) testimonial.displayOrder = displayOrder;
    if (isActive !== undefined) testimonial.isActive = isActive;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete testimonial (admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
