# Cloudinary File Upload Integration - DigiQuest

## Overview
This document describes the complete Cloudinary integration for file uploads in the DigiQuest MERN stack project. All course media files (thumbnails, banners, preview videos, PDFs, ZIP files, DOCX files) are now stored in Cloudinary instead of local storage.

## Architecture

### Backend Components

#### 1. Cloudinary Configuration (`backend/config/cloudinary.js`)
- Configures Cloudinary SDK using environment variables
- Logs configuration status on startup
- Exports configured Cloudinary instance

**Environment Variables Required:**
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

#### 2. Multer Middleware (`backend/middleware/uploadCloudinary.js`)
- Uses memory storage for file uploads (files stored in buffer before Cloudinary upload)
- Validates file types and sizes
- Supports multiple file types: Images, Videos, PDFs, ZIPs, DOCX

**File Size Limits:**
- Images: 5 MB
- Videos: 100 MB
- PDFs: 20 MB
- ZIPs: 100 MB
- DOCX: 10 MB

**Allowed File Types:**
- Images: JPEG, JPG, PNG, WebP
- Videos: MP4, MOV, WebM
- PDFs: application/pdf
- ZIPs: application/zip, application/x-zip-compressed
- DOCX: application/vnd.openxmlformats-officedocument.wordprocessingml.document

#### 3. Cloudinary Upload Utility (`backend/utils/cloudinaryUpload.js`)
- Handles uploading files to Cloudinary
- Automatically detects resource type (image, video, raw)
- Uploads files to organized folders: `DigiQuest/Courses/Thumbnails`, `DigiQuest/Courses/Banners`, etc.
- Returns secure_url, public_id, resource_type, and metadata
- Provides deletion functions for cleanup

**Key Functions:**
- `uploadToCloudinary()` - Upload single file
- `uploadMultipleToCloudinary()` - Upload multiple files
- `uploadCourseFiles()` - Upload course files with metadata
- `deleteFromCloudinary()` - Delete single file
- `deleteMultipleFromCloudinary()` - Delete multiple files
- `extractPublicIdFromUrl()` - Extract public ID from Cloudinary URL

#### 4. Updated Course Schema (`backend/model/Course.js`)
Added Cloudinary public_id fields for all media files:

**Main Course Fields:**
- `imagePublicId` - Cloudinary public ID for thumbnail
- `bannerPublicId` - Cloudinary public ID for banner
- `demoVideoPublicId` - Cloudinary public ID for demo video

**Video Schema:**
- `publicId` - Cloudinary public ID for video
- `resourceType` - Resource type (video)
- `thumbnailPublicId` - Cloudinary public ID for video thumbnail

**Note Schema:**
- `publicId` - Cloudinary public ID for file
- `resourceType` - Resource type (raw for PDFs, ZIPs, DOCX)
- `fileType` - File type (pdf, zip, doc, docx)

#### 5. Course Controller (`backend/controller/courseController.js`)

**createCourse:**
- Accepts FormData with file uploads
- Uploads thumbnail, banner, preview video to Cloudinary
- Uploads course files (PDFs, ZIPs, DOCX) to Cloudinary
- Stores Cloudinary URLs and public IDs in MongoDB
- Returns created course with Cloudinary URLs

**updateCourse:**
- Accepts FormData with file uploads
- Deletes old files from Cloudinary when new files are uploaded
- Uploads new files to Cloudinary
- Updates MongoDB with new Cloudinary URLs and public IDs
- Preserves existing files if no new files uploaded

**deleteCourse:**
- Finds course before deletion
- Collects all Cloudinary public IDs (thumbnail, banner, demo video, videos, notes)
- Deletes all files from Cloudinary
- Deletes course from MongoDB
- Ensures no orphan files remain in Cloudinary

#### 6. Course Routes (`backend/routes/courses.js`)
- Updated to use `uploadCourseFilesCloudinary` middleware
- Handles multipart/form-data for file uploads
- Maintains admin authentication for all course operations

### Frontend Components

#### 1. Admin Dashboard (`frontend/src/pages/AdminDashboard.jsx`)

**Course Form State:**
- Added file upload fields: `thumbnailFile`, `bannerFile`, `previewVideoFile`, `courseFiles`
- Added Cloudinary public ID fields for existing files

**File Upload Handlers:**
- `handleFileChange()` - Handle single file uploads
- `handleCourseFilesChange()` - Handle multiple course files
- `removeCourseFile()` - Remove selected file from list

**Form Submission:**
- Creates FormData for file uploads
- Appends all form fields to FormData
- Handles both new file uploads and existing URLs
- Sends multipart/form-data to backend

**File Upload UI:**
- Thumbnail: File input with image preview (32x32)
- Banner: File input with image preview (48x24)
- Demo Video: File input with video preview using UniversalVideoPlayer
- Course Files: Multiple file input with file list and remove buttons
- Shows current files when editing (with previews)

#### 2. API Service (`frontend/src/services/api.js`)

**Updated courseAPI:**
- `createCourse()` - Detects FormData and sets multipart/form-data headers
- `updateCourse()` - Detects FormData and sets multipart/form-data headers
- Maintains backward compatibility with JSON data

## Setup Instructions

### 1. Install Required Packages (Already Installed)
```bash
cd backend
npm install cloudinary multer dotenv
```

### 2. Configure Cloudinary Credentials

Add the following to your `backend/.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Get your credentials from [Cloudinary Console](https://cloudinary.com/console)

### 3. Start the Backend Server
```bash
cd backend
npm start
```

You should see: `✓ Cloudinary configured successfully`

### 4. Start the Frontend
```bash
cd frontend
npm start
```

## Usage

### Adding a New Course

1. Navigate to Admin Dashboard
2. Click "Add New Course"
3. Fill in course details
4. **Upload Thumbnail:** Select an image file (JPG, PNG, WebP, max 5MB)
5. **Upload Banner:** Select an image file (JPG, PNG, WebP, max 5MB)
6. **Upload Demo Video:** Select a video file (MP4, MOV, WebM, max 100MB)
7. **Upload Course Files:** Select PDFs, ZIPs, or DOCX files (multiple allowed)
8. Click "Create Course"

Files are automatically uploaded to Cloudinary and URLs are stored in MongoDB.

### Editing an Existing Course

1. Navigate to Admin Dashboard
2. Click "Edit" on the course you want to modify
3. Current files are displayed with previews
4. To replace a file, select a new file (old file will be deleted from Cloudinary)
5. To add new course files, select additional files
6. Click "Update Course"

### Deleting a Course

1. Navigate to Admin Dashboard
2. Click "Delete" on the course
3. Confirm deletion
4. All associated files are automatically deleted from Cloudinary

## File Organization in Cloudinary

Files are organized in the following folder structure:
- `DigiQuest/Courses/Thumbnails/` - Course thumbnail images
- `DigiQuest/Courses/Banners/` - Course banner images
- `DigiQuest/Courses/DemoVideos/` - Course demo videos
- `DigiQuest/Courses/Files/` - Course files (PDFs, ZIPs, DOCX)

## Error Handling

### Backend Errors
- **File size exceeded:** Returns descriptive error with size limits
- **Invalid file type:** Returns error with allowed types
- **Cloudinary upload failure:** Logs error and returns 500 response
- **MongoDB errors:** Returns validation errors with field details

### Frontend Errors
- **Upload failure:** Displays toast notification with error message
- **Validation errors:** Shows inline validation messages
- **Network errors:** Displays toast notification

## Security

- Only authenticated admins can upload, replace, or delete files
- JWT middleware protects all course endpoints
- File size limits prevent abuse
- File type validation prevents malicious uploads
- Cloudinary credentials are stored in environment variables (never in code)

## Best Practices

1. **Always use FormData for file uploads** - The API service automatically detects FormData and sets correct headers
2. **Preview files before uploading** - The UI shows previews for images and videos
3. **Clean up old files** - When editing, old files are automatically deleted from Cloudinary
4. **Monitor Cloudinary storage** - Check Cloudinary dashboard for storage usage
5. **Use appropriate file sizes** - Compress images and videos before uploading

## Troubleshooting

### Cloudinary Configuration Error
**Error:** `⚠ Cloudinary credentials missing in environment variables`

**Solution:** Ensure all three Cloudinary environment variables are set in `backend/.env`

### File Upload Fails
**Error:** `File size exceeds limit` or `Invalid file type`

**Solution:** Check file size and type against limits in `uploadCloudinary.js`

### Files Not Deleting
**Error:** Orphan files remain in Cloudinary

**Solution:** Ensure `publicId` fields are correctly set in MongoDB. Check console logs for deletion errors.

### FormData Not Working
**Error:** Files not uploading to Cloudinary

**Solution:** Ensure API service detects FormData and sets `Content-Type: multipart/form-data` header

## Migration Notes

### For Existing Courses
Existing courses with local file URLs will continue to work. To migrate:
1. Edit each course
2. Upload new files via the file inputs
3. Save the course
4. Old URLs will be replaced with Cloudinary URLs

### Database Migration
The Course schema has been updated with new required fields (`imagePublicId`, `bannerPublicId`, etc.). For existing courses:
- These fields will be empty strings by default
- When editing a course, you must upload new files to populate these fields
- Or update MongoDB directly with existing Cloudinary public IDs

## API Endpoints

### Course Endpoints
- `POST /api/courses` - Create course with file uploads (Admin only)
- `PUT /api/courses/:id` - Update course with file uploads (Admin only)
- `DELETE /api/courses/:id` - Delete course and cleanup Cloudinary files (Admin only)
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/:id/videos` - Get course videos
- `GET /api/courses/:id/notes` - Get course notes

## File Type Reference

| File Type | Extensions | Max Size | Resource Type | Cloudinary Folder |
|-----------|------------|----------|---------------|------------------|
| Thumbnail | jpg, jpeg, png, webp | 5 MB | image | DigiQuest/Courses/Thumbnails |
| Banner | jpg, jpeg, png, webp | 5 MB | image | DigiQuest/Courses/Banners |
| Demo Video | mp4, mov, webm | 100 MB | video | DigiQuest/Courses/DemoVideos |
| PDF | pdf | 20 MB | raw | DigiQuest/Courses/Files |
| ZIP | zip | 100 MB | raw | DigiQuest/Courses/Files |
| DOCX | docx | 10 MB | raw | DigiQuest/Courses/Files |

## Support

For issues or questions:
1. Check Cloudinary dashboard for upload logs
2. Check backend console for error messages
3. Check browser console for frontend errors
4. Review this documentation for common solutions

## Summary

The Cloudinary integration provides:
- ✅ Secure file storage in the cloud
- ✅ Automatic file organization
- ✅ File type and size validation
- ✅ Automatic cleanup on deletion
- ✅ File replacement with old file deletion
- ✅ Preview functionality in admin dashboard
- ✅ Production-ready error handling
- ✅ No orphan files in Cloudinary
- ✅ ES Module syntax throughout
- ✅ Clean, reusable code structure
