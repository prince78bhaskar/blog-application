/**
 * Video URL Utility Functions
 * Handles YouTube and Google Drive video URL detection and conversion to embed URLs
 */

/**
 * Check if a URL is a YouTube video
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is a YouTube video
 */
export const isYouTubeUrl = (url) => {
  if (!url) return false;
  const youtubePatterns = [
    /youtube\.com\/watch\?v=/i,
    /youtu\.be\//i,
    /youtube\.com\/embed\//i
  ];
  return youtubePatterns.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is a Google Drive video
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is a Google Drive video
 */
export const isGoogleDriveUrl = (url) => {
  if (!url) return false;
  const drivePatterns = [
    /drive\.google\.com\/file\/d\//i,
    /drive\.google\.com\/open\?id=/i
  ];
  return drivePatterns.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is a valid video URL (YouTube or Google Drive)
 * @param {string} url - The video URL to validate
 * @returns {boolean} - True if the URL is a valid video URL
 */
export const isValidVideoUrl = (url) => {
  if (!url) return false;
  return isYouTubeUrl(url) || isGoogleDriveUrl(url);
};

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The video ID or null if not found
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&\s]+)/);
  if (watchMatch) return watchMatch[1];

  // Format: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^&\s]+)/);
  if (shortMatch) return shortMatch[1];

  // Format: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\s]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
};

/**
 * Extract Google Drive file ID from various Drive URL formats
 * @param {string} url - The Google Drive URL
 * @returns {string|null} - The file ID or null if not found
 */
export const getGoogleDriveFileId = (url) => {
  if (!url) return null;

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^\/\s]+)/);
  if (fileMatch) return fileMatch[1];

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&\s]+)/);
  if (openMatch) return openMatch[1];

  return null;
};

/**
 * Convert any video URL to its embed URL
 * @param {string} url - The original video URL
 * @returns {string|null} - The embed URL or null if invalid
 */
export const getEmbedVideoUrl = (url) => {
  if (!url) return null;

  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  if (isGoogleDriveUrl(url)) {
    const fileId = getGoogleDriveFileId(url);
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
  }

  return null;
};

/**
 * Get video provider type
 * @param {string} url - The video URL
 * @returns {string} - 'youtube', 'drive', or 'unknown'
 */
export const getVideoProvider = (url) => {
  if (!url) return 'unknown';
  if (isYouTubeUrl(url)) return 'youtube';
  if (isGoogleDriveUrl(url)) return 'drive';
  return 'unknown';
};

/**
 * Validate video URL and return error message if invalid
 * @param {string} url - The video URL to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateVideoUrl = (url) => {
  if (!url || !url.trim()) {
    return 'Video URL is required';
  }

  if (!isValidVideoUrl(url)) {
    return 'Please enter a valid YouTube or Google Drive video link';
  }

  // For YouTube, verify we can extract the video ID
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return 'Invalid YouTube URL format';
    }
  }

  // For Google Drive, verify we can extract the file ID
  if (isGoogleDriveUrl(url)) {
    const fileId = getGoogleDriveFileId(url);
    if (!fileId) {
      return 'Invalid Google Drive URL format';
    }
  }

  return null;
};
