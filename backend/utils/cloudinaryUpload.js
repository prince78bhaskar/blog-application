import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Cloudinary Upload Utility
 * Handles uploading files to Cloudinary with automatic resource type detection
 */

/**
 * Detect resource type based on file mimetype
 * @param {string} mimetype - File mimetype
 * @returns {string} - Cloudinary resource type (image, video, raw)
 */
const detectResourceType = (mimetype) => {
  if (mimetype.startsWith('image/')) {
    return 'image';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else {
    return 'raw'; // PDF, ZIP, DOCX, etc.
  }
};

/**
 * Detect file type for database storage
 * @param {string} mimetype - File mimetype
 * @returns {string} - File type (image, video, pdf, zip, docx)
 */
const detectFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) {
    return 'image';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else if (mimetype === 'application/pdf') {
    return 'pdf';
  } else if (mimetype === 'application/zip' || mimetype === 'application/x-zip-compressed') {
    return 'zip';
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return 'docx';
  }
  return 'file';
};

/**
 * Upload a single file to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer memory storage
 * @param {string} mimetype - File mimetype
 * @param {string} folder - Cloudinary folder path
 * @param {string} publicId - Optional custom public ID
 * @returns {Promise<Object>} - Upload result with secure_url, public_id, resource_type
 */
export const uploadToCloudinary = async (fileBuffer, mimetype, folder = 'DigiQuest/Courses', publicId = null) => {
  try {
    // Convert buffer to readable stream
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);

    // Detect resource type
    const resourceType = detectResourceType(mimetype);

    // Upload options
    const uploadOptions = {
      folder: folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true,
      overwrite: false
    };

    // Add custom public ID if provided
    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      bufferStream.pipe(uploadStream);
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration,
      fileType: detectFileType(mimetype)
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of file objects with buffer and mimetype
 * @param {string} folder - Cloudinary folder path
 * @returns {Promise<Array>} - Array of upload results
 */
export const uploadMultipleToCloudinary = async (files, folder = 'DigiQuest/Courses') => {
  const uploadPromises = files.map(file => 
    uploadToCloudinary(file.buffer, file.mimetype, folder)
  );

  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple Cloudinary upload error:', error);
    throw new Error(`Failed to upload files to Cloudinary: ${error.message}`);
  }
};

/**
 * Delete a file from Cloudinary using public ID
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - Resource type (image, video, raw)
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
  }
};

/**
 * Delete multiple files from Cloudinary
 * @param {Array} publicIds - Array of public IDs with resource types
 * @returns {Promise<Array>} - Array of deletion results
 */
export const deleteMultipleFromCloudinary = async (publicIds) => {
  const deletePromises = publicIds.map(({ publicId, resourceType }) =>
    deleteFromCloudinary(publicId, resourceType)
  );

  try {
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error('Multiple Cloudinary deletion error:', error);
    throw new Error(`Failed to delete files from Cloudinary: ${error.message}`);
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} - Public ID or null if not found
 */
export const extractPublicIdFromUrl = (url) => {
  try {
    if (!url || !url.includes('cloudinary.com')) {
      return null;
    }

    // Extract public ID from URL
    // Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.format
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1) {
      return null;
    }

    // Get everything after 'upload' including version
    const pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
    
    // Remove version number if present
    const pathWithoutVersion = pathAfterUpload.replace(/\/v\d+/, '');
    
    // Remove file extension
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

/**
 * Upload course files with metadata
 * @param {Array} files - Array of file objects with buffer, mimetype, and optional title
 * @param {string} folder - Cloudinary folder path
 * @returns {Promise<Array>} - Array of upload results with metadata
 */
export const uploadCourseFiles = async (files, folder = 'DigiQuest/Courses') => {
  const uploadResults = [];

  for (const file of files) {
    try {
      const result = await uploadToCloudinary(
        file.buffer,
        file.mimetype,
        folder
      );

      uploadResults.push({
        title: file.title || file.originalname,
        fileUrl: result.secure_url,
        fileType: result.fileType,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes
      });
    } catch (error) {
      console.error(`Error uploading file ${file.originalname}:`, error);
      throw error;
    }
  }

  return uploadResults;
};

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
  extractPublicIdFromUrl,
  uploadCourseFiles
};
