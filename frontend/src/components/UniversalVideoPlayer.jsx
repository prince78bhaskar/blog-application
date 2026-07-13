import React, { useState, useRef, useEffect } from 'react';
import { getVideoType, getEmbedUrl } from '../utils/videoUtils';

/**
 * UniversalVideoPlayer Component
 * A reusable video player that automatically detects and plays videos from different platforms.
 * Supports: YouTube, Vimeo, Google Drive, Dropbox, and direct video files (MP4, WebM, etc.)
 * 
 * @param {Object} props
 * @param {string} props.videoUrl - The URL of the video to play
 * @param {boolean} props.autoPlay - Whether to auto-play the video (default: false)
 * @param {boolean} props.muted - Whether to play the video muted (default: true for autoplay)
 * @param {boolean} props.loop - Whether to loop the video (default: false)
 * @param {boolean} props.controls - Whether to show video controls (default: true)
 * @param {boolean} props.playsInline - Whether to play inline on mobile (default: true)
 * @param {string} props.className - Additional CSS classes for the container
 * @param {string} props.thumbnail - Fallback thumbnail image URL
 * @param {Function} props.onLoad - Callback when video loads successfully
 * @param {Function} props.onError - Callback when video fails to load
 * @param {Object} props.style - Additional inline styles for the container
 */
const UniversalVideoPlayer = ({
  videoUrl,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  playsInline = true,
  className = '',
  thumbnail = null,
  onLoad = null,
  onError = null,
  style = {},
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videoType, setVideoType] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  // Detect video type and prepare embed URL on mount or when videoUrl changes
  useEffect(() => {
    if (!videoUrl) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    const detectedType = getVideoType(videoUrl);
    const preparedEmbedUrl = getEmbedUrl(videoUrl);

    setVideoType(detectedType);
    setEmbedUrl(preparedEmbedUrl);

    if (detectedType === 'unsupported') {
      setError(true);
      setLoading(false);
      if (onError) onError('Unsupported video platform');
    }
  }, [videoUrl, onError]);

  // Handle video load events
  const handleVideoLoad = () => {
    setLoading(false);
    setError(false);
    if (onLoad) onLoad();
  };

  // Handle video error events
  const handleVideoError = () => {
    setLoading(false);
    setError(true);
    if (onError) onError('Failed to load video');
  };

  // Handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false);
    setError(false);
    if (onLoad) onLoad();
  };

  // Handle iframe error events
  const handleIframeError = () => {
    setLoading(false);
    setError(true);
    if (onError) onError('Failed to load video');
  };

  // Render loading state
  const renderLoading = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
        <p className="text-white text-sm">Loading video...</p>
      </div>
    </div>
  );

  // Render error state
  const renderError = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-white font-semibold">Unable to load video</p>
        <p className="text-gray-400 text-sm">
          {videoType === 'unsupported' ? 'Unsupported video platform' : 'Video could not be loaded'}
        </p>
      </div>
    </div>
  );

  // Render fallback thumbnail
  const renderThumbnail = () => {
    if (thumbnail) {
      return (
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    return null;
  };

  // Render YouTube iframe
  const renderYouTube = () => {
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${videoId}&enablejsapi=1&rel=0&modestbranding=1`;
    
    return (
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full object-cover"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    );
  };

  // Render Vimeo iframe
  const renderVimeo = () => {
    const videoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
    const src = `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}&title=0&byline=0&portrait=0`;
    
    return (
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full object-cover"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo video player"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    );
  };

  // Render Google Drive iframe
  const renderGoogleDrive = () => {
    const fileId = videoUrl.match(/drive\.google\.com\/file\/d\/([^\/\s]+)/)?.[1];
    const src = fileId 
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : videoUrl.replace('/view', '/preview');
    
    return (
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full object-cover"
        allow="autoplay"
        title="Google Drive video player"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    );
  };

  // Render Dropbox video (uses HTML5 video with direct URL)
  const renderDropbox = () => {
    return (
      <video
        ref={videoRef}
        src={embedUrl}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      />
    );
  };

  // Render direct video file (HTML5 video)
  const renderDirectVideo = () => {
    return (
      <video
        ref={videoRef}
        src={embedUrl}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      />
    );
  };

  // Render unsupported message
  const renderUnsupported = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
        <div className="flex flex-col items-center gap-4 p-6 text-center">
          <svg
            className="w-16 h-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-white font-semibold">Unsupported Video Platform</p>
          <p className="text-gray-400 text-sm">
            This video platform is not supported. Please use YouTube, Vimeo, Google Drive, Dropbox, or a direct video file.
          </p>
        </div>
      </div>
    );
  };

  // Main render based on video type
  const renderVideoPlayer = () => {
    switch (videoType) {
      case 'youtube':
        return renderYouTube();
      case 'vimeo':
        return renderVimeo();
      case 'gdrive':
        return renderGoogleDrive();
      case 'dropbox':
        return renderDropbox();
      case 'direct':
        return renderDirectVideo();
      case 'unsupported':
        return renderUnsupported();
      default:
        return renderUnsupported();
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-900 ${className}`}
      style={style}
    >
      {/* Video Player */}
      {renderVideoPlayer()}

      {/* Loading State */}
      {loading && !error && renderLoading()}

      {/* Error State */}
      {error && renderError()}

      {/* Fallback Thumbnail (shown when loading or on error) */}
      {(loading || error) && renderThumbnail()}
    </div>
  );
};

export default UniversalVideoPlayer;
