/**
 * Video URL Utility Functions
 * Handles video URL detection and conversion to embed URLs for multiple platforms
 * Supported platforms: YouTube, Vimeo, Google Drive, Dropbox, Direct video files
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
    /youtube\.com\/shorts\//i,
    /youtu\.be\//i,
    /youtube\.com\/embed\//i
  ];
  return youtubePatterns.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is a Vimeo video
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is a Vimeo video
 */
export const isVimeoUrl = (url) => {
  if (!url) return false;
  const vimeoPatterns = [
    /vimeo\.com\//i,
    /player\.vimeo\.com\//i
  ];
  return vimeoPatterns.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is a Dropbox video
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is a Dropbox video
 */
export const isDropboxUrl = (url) => {
  if (!url) return false;
  const dropboxPatterns = [
    /dropbox\.com\//i,
    /db\.tt\//i
  ];
  return dropboxPatterns.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is a direct video file
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is a direct video file
 */
export const isDirectVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = [
    /\.mp4(\?|$)/i,
    /\.webm(\?|$)/i,
    /\.ogg(\?|$)/i,
    /\.mov(\?|$)/i,
    /\.avi(\?|$)/i,
    /\.mkv(\?|$)/i,
    /\.m4v(\?|$)/i,
    /\.wmv(\?|$)/i,
    /\.flv(\?|$)/i
  ];
  return videoExtensions.some(pattern => pattern.test(url));
};

/**
 * Check if a URL is from a CDN that returns direct video files
 * @param {string} url - The video URL to check
 * @returns {boolean} - True if the URL is from a CDN
 */
export const isCdnUrl = (url) => {
  if (!url) return false;
  const cdnPatterns = [
    /cloudinary\.com/i,
    /cloudfront\.net/i,
    /amazonaws\.com/i,
    /firebase\.com/i,
    /firebasestorage\.googleapis\.com/i,
    /storage\.googleapis\.com/i,
    /cdn\.*/i,
    /.*\.s3-.*\.amazonaws\.com/i,
    /.*\.cloudfunctions\.net/i
  ];
  return cdnPatterns.some(pattern => pattern.test(url));
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
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The video ID or null if not found
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&\s]+)/);
  if (watchMatch) return watchMatch[1];

  // Format: https://www.youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\s]+)/);
  if (shortsMatch) return shortsMatch[1];

  // Format: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^&\s]+)/);
  if (shortMatch) return shortMatch[1];

  // Format: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^&\s]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
};

/**
 * Extract Vimeo video ID from various Vimeo URL formats
 * @param {string} url - The Vimeo URL
 * @returns {string|null} - The video ID or null if not found
 */
export const getVimeoVideoId = (url) => {
  if (!url) return null;

  // Format: https://vimeo.com/VIDEO_ID
  const standardMatch = url.match(/vimeo\.com\/(\d+)/);
  if (standardMatch) return standardMatch[1];

  // Format: https://player.vimeo.com/video/VIDEO_ID
  const playerMatch = url.match(/player\.vimeo\.com\/video\/(\d+)/);
  if (playerMatch) return playerMatch[1];

  // Format: https://vimeo.com/channels/staffpicks/VIDEO_ID
  const channelMatch = url.match(/vimeo\.com\/channels\/[\w-]+\/(\d+)/);
  if (channelMatch) return channelMatch[1];

  return null;
};

/**
 * Convert Dropbox share URL to direct download URL
 * @param {string} url - The Dropbox share URL
 * @returns {string|null} - The direct download URL or null if invalid
 */
export const getDropboxDirectUrl = (url) => {
  if (!url) return null;

  // Replace share link with direct download link
  if (url.includes('dropbox.com')) {
    // Format: https://www.dropbox.com/s/FILE_ID/FILENAME?dl=0
    // Convert to: https://www.dropbox.com/s/FILE_ID/FILENAME?dl=1
    return url.replace(/\?dl=0$/, '?dl=1').replace(/$/, url.includes('?') ? '&dl=1' : '?dl=1');
  }

  return url;
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

  if (isVimeoUrl(url)) {
    const videoId = getVimeoVideoId(url);
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }

  if (isGoogleDriveUrl(url)) {
    const fileId = getGoogleDriveFileId(url);
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
  }

  if (isDropboxUrl(url)) {
    return getDropboxDirectUrl(url);
  }

  // For direct video URLs and CDNs, return as-is
  if (isDirectVideoUrl(url) || isCdnUrl(url)) {
    return url;
  }

  return null;
};

/**
 * Get video provider type
 * @param {string} url - The video URL
 * @returns {string} - 'youtube', 'vimeo', 'drive', 'dropbox', 'direct', or 'unsupported'
 */
export const getVideoProvider = (url) => {
  if (!url) return 'unsupported';
  if (isYouTubeUrl(url)) return 'youtube';
  if (isVimeoUrl(url)) return 'vimeo';
  if (isGoogleDriveUrl(url)) return 'drive';
  if (isDropboxUrl(url)) return 'dropbox';
  if (isDirectVideoUrl(url) || isCdnUrl(url)) return 'direct';
  return 'unsupported';
};

/**
 * Get video type (alias for getVideoProvider for consistency with requirements)
 * @param {string} url - The video URL
 * @returns {string} - 'youtube', 'vimeo', 'gdrive', 'dropbox', 'direct', or 'unsupported'
 */
export const getVideoType = (url) => {
  const provider = getVideoProvider(url);
  // Map 'drive' to 'gdrive' for consistency with requirements
  return provider === 'drive' ? 'gdrive' : provider;
};

/**
 * Get embed URL (alias for getEmbedVideoUrl for consistency with requirements)
 * @param {string} url - The original video URL
 * @returns {string|null} - The embed URL or null if invalid
 */
export const getEmbedUrl = (url) => {
  return getEmbedVideoUrl(url);
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

  const videoType = getVideoType(url);
  if (videoType === 'unsupported') {
    return 'Please enter a valid video URL (YouTube, Vimeo, Google Drive, Dropbox, or direct video file)';
  }

  // For YouTube, verify we can extract the video ID
  if (isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
      return 'Invalid YouTube URL format';
    }
  }

  // For Vimeo, verify we can extract the video ID
  if (isVimeoUrl(url)) {
    const videoId = getVimeoVideoId(url);
    if (!videoId) {
      return 'Invalid Vimeo URL format';
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

/**
 * Check if a URL is a valid video URL (supports all platforms)
 * @param {string} url - The video URL to validate
 * @returns {boolean} - True if the URL is a valid video URL
 */
export const isValidVideoUrl = (url) => {
  if (!url) return false;
  const videoType = getVideoType(url);
  return videoType !== 'unsupported';
};
