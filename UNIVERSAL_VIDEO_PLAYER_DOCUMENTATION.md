# Universal Video Player Documentation

## Overview

The Universal Video Player is a reusable React component that automatically detects and plays videos from multiple platforms without requiring manual platform selection. It provides a unified interface for handling different video sources with built-in loading states, error handling, and fallback thumbnails.

## Supported Platforms

1. **YouTube** - Full support for all YouTube URL formats:
   - `youtube.com/watch?v=VIDEO_ID`
   - `youtube.com/shorts/VIDEO_ID`
   - `youtu.be/VIDEO_ID`
   - `youtube.com/embed/VIDEO_ID`

2. **Vimeo** - Full support for Vimeo URLs:
   - `vimeo.com/VIDEO_ID`
   - `player.vimeo.com/video/VIDEO_ID`
   - `vimeo.com/channels/CHANNEL_NAME/VIDEO_ID`

3. **Google Drive** - Full support for Drive share links:
   - `drive.google.com/file/d/FILE_ID/view`
   - `drive.google.com/open?id=FILE_ID`

4. **Dropbox** - Converts share links to direct download URLs:
   - `dropbox.com/s/FILE_ID/FILENAME`
   - Automatically converts to direct video URL

5. **Direct Video Files** - Supports all common video formats:
   - `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`, `.mkv`, `.m4v`, `.wmv`, `.flv`

6. **CDN Links** - Automatically detects and handles CDN URLs:
   - Cloudinary
   - AWS S3 / CloudFront
   - Firebase Storage
   - Google Cloud Storage
   - Any other CDN returning direct video files

## Helper Functions

### `getVideoType(url)`

Detects the video platform from a URL.

**Returns:**
- `'youtube'` - YouTube video
- `'vimeo'` - Vimeo video
- `'gdrive'` - Google Drive video
- `'dropbox'` - Dropbox video
- `'direct'` - Direct video file or CDN
- `'unsupported'` - Unsupported platform

**Example:**
```javascript
import { getVideoType } from '../utils/videoUtils';

const type = getVideoType('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
console.log(type); // 'youtube'
```

### `getEmbedUrl(url)`

Converts a video URL to its embeddable format.

**Returns:**
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- Google Drive: `https://drive.google.com/file/d/FILE_ID/preview`
- Dropbox: Direct download URL
- Direct/CDN: Original URL (unchanged)
- Unsupported: `null`

**Example:**
```javascript
import { getEmbedUrl } from '../utils/videoUtils';

const embedUrl = getEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
console.log(embedUrl); // 'https://www.youtube.com/embed/dQw4w9WgXcQ'
```

### `validateVideoUrl(url)`

Validates a video URL and returns an error message if invalid.

**Returns:**
- `null` - URL is valid
- `string` - Error message describing the issue

**Example:**
```javascript
import { validateVideoUrl } from '../utils/videoUtils';

const error = validateVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
if (error) {
  console.error(error);
} else {
  console.log('Valid URL');
}
```

## UniversalVideoPlayer Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoUrl` | `string` | **required** | The URL of the video to play |
| `autoPlay` | `boolean` | `false` | Whether to auto-play the video |
| `muted` | `boolean` | `true` | Whether to play the video muted (required for autoplay) |
| `loop` | `boolean` | `false` | Whether to loop the video |
| `controls` | `boolean` | `true` | Whether to show video controls |
| `playsInline` | `boolean` | `true` | Whether to play inline on mobile devices |
| `className` | `string` | `''` | Additional CSS classes for the container |
| `thumbnail` | `string` | `null` | Fallback thumbnail image URL |
| `onLoad` | `function` | `null` | Callback when video loads successfully |
| `onError` | `function` | `null` | Callback when video fails to load |
| `style` | `object` | `{}` | Additional inline styles for the container |

### Basic Usage

```javascript
import UniversalVideoPlayer from '../components/UniversalVideoPlayer';

function MyComponent() {
  return (
    <UniversalVideoPlayer
      videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      autoPlay={true}
      muted={true}
      controls={true}
      className="w-full h-64"
    />
  );
}
```

### With Thumbnail Fallback

```javascript
<UniversalVideoPlayer
  videoUrl="https://vimeo.com/123456789"
  thumbnail="https://example.com/thumbnail.jpg"
  autoPlay={false}
  controls={true}
/>
```

### With Event Handlers

```javascript
<UniversalVideoPlayer
  videoUrl="https://drive.google.com/file/d/FILE_ID/view"
  onLoad={() => console.log('Video loaded successfully')}
  onError={(error) => console.error('Video failed to load:', error)}
  autoPlay={true}
  muted={true}
/>
```

### In a Carousel/Swiper

```javascript
{testimonials.map((testimonial) => (
  <div key={testimonial.id} className="carousel-item">
    <UniversalVideoPlayer
      videoUrl={testimonial.videoUrl}
      autoPlay={isActive}
      muted={isActive}
      loop={isActive}
      controls={isActive}
      thumbnail={testimonial.thumbnail}
      className="w-full h-full"
      style={{ aspectRatio: '9/16' }}
    />
  </div>
))}
```

## Features

### Automatic Platform Detection

The component automatically detects the video platform and renders the appropriate player:
- **YouTube/Vimeo/Google Drive**: Renders an iframe with the embed URL
- **Dropbox/Direct/CDN**: Renders an HTML5 `<video>` element

### Loading States

Shows a loading spinner while the video is being loaded:
```javascript
{loading && (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
    <p className="text-white text-sm">Loading video...</p>
  </div>
)}
```

### Error Handling

Displays an error message if the video fails to load:
```javascript
{error && (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
    <div className="flex flex-col items-center gap-4">
      <svg className="w-16 h-16 text-red-500">...</svg>
      <p className="text-white font-semibold">Unable to load video</p>
    </div>
  </div>
)}
```

### Fallback Thumbnails

If a thumbnail is provided, it will be displayed while the video is loading or if it fails to load:
```javascript
{(loading || error) && thumbnail && (
  <img src={thumbnail} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover" />
)}
```

### Responsive Design

The component is fully responsive and works with:
- Custom aspect ratios
- Tailwind CSS classes
- Inline styles
- Carousel/Swiper components

## Integration with Video Testimonials

The Universal Video Player has been integrated into the Video Testimonials component:

```javascript
// VideoTestimonials.jsx
import UniversalVideoPlayer from './UniversalVideoPlayer';

// In the carousel:
<UniversalVideoPlayer
  videoUrl={testimonial.videoUrl}
  autoPlay={isCenter}
  muted={isCenter}
  loop={isCenter}
  controls={isCenter}
  playsInline={true}
  thumbnail={testimonial.thumbnail}
  className="w-full h-full"
  style={{ aspectRatio: '9/16' }}
/>
```

## Platform-Specific Notes

### YouTube
- Requires muted autoplay for automatic playback
- Supports playlists and looping
- Uses YouTube Embed API with modest branding

### Vimeo
- Supports autoplay and looping
- Hides Vimeo branding (title, byline, portrait)
- Fullscreen support enabled

### Google Drive
- Uses preview mode for embedding
- Requires proper sharing permissions
- Auto-play may be limited by Drive's policies

### Dropbox
- Converts share links to direct download URLs
- Uses HTML5 video player
- Requires proper sharing permissions

### Direct Files & CDNs
- Uses HTML5 video player
- Supports all common video formats
- CDN URLs are automatically detected

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with `playsInline` attribute

## Performance Considerations

1. **Lazy Loading**: Videos only load when the component mounts
2. **Thumbnail Fallback**: Reduces initial load time
3. **Platform Detection**: Efficient regex-based detection
4. **Conditional Rendering**: Only renders the necessary player type

## Troubleshooting

### Video not loading
- Check if the URL is valid using `validateVideoUrl()`
- Verify the video has proper sharing permissions
- Check browser console for specific error messages

### Autoplay not working
- Ensure `muted={true}` for autoplay (browser requirement)
- Check if browser blocks autoplay
- Verify the platform supports autoplay

### Black screen for YouTube
- Ensure the URL is a valid YouTube URL
- Check if the video is publicly available
- Verify YouTube embed is not restricted

### Dropbox video not playing
- Ensure the Dropbox link is a share link
- Verify the file is a video format
- Check if direct download is enabled

## Examples

### YouTube Video
```javascript
<UniversalVideoPlayer
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  autoPlay={true}
  muted={true}
/>
```

### Vimeo Video
```javascript
<UniversalVideoPlayer
  videoUrl="https://vimeo.com/123456789"
  autoPlay={false}
  controls={true}
/>
```

### Google Drive Video
```javascript
<UniversalVideoPlayer
  videoUrl="https://drive.google.com/file/d/FILE_ID/view"
  autoPlay={true}
  muted={true}
/>
```

### Dropbox Video
```javascript
<UniversalVideoPlayer
  videoUrl="https://www.dropbox.com/s/FILE_ID/video.mp4?dl=0"
  autoPlay={false}
  controls={true}
/>
```

### Direct Video File
```javascript
<UniversalVideoPlayer
  videoUrl="https://example.com/videos/tutorial.mp4"
  autoPlay={true}
  muted={true}
  loop={true}
/>
```

### CDN Video (Cloudinary)
```javascript
<UniversalVideoPlayer
  videoUrl="https://res.cloudinary.com/your-cloud/video/upload/v1234567890/video.mp4"
  autoPlay={true}
  muted={true}
/>
```

## Future Enhancements

Potential improvements for future versions:
- Add support for Dailymotion
- Add support for Wistia
- Add custom video controls
- Add video analytics tracking
- Add picture-in-picture mode
- Add video quality selection
- Add subtitle/caption support
- Add video speed control

## License

This component is part of the DigiQuest project and follows the project's license.
