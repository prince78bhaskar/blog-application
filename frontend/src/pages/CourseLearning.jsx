import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { courseAPI, learningContentAPI, dashboardAPI, lessonProgressAPI } from '../services/api';
import { getEmbedVideoUrl, getVideoProvider } from '../utils/videoUtils';


  const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeContentType, setActiveContentType] = useState('video');
  const [videoError, setVideoError] = useState(false);
  
  // Lesson progress tracking state
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [markingComplete, setMarkingComplete] = useState(false);


  useEffect(() => {
    // FIX: Moved fetchCourseData inside useEffect to prevent duplicate calls
    // Added cleanup flag to prevent duplicate calls in React StrictMode (development only)
    let isMounted = true;

    const fetchCourseData = async () => {
      try {
        // Fetch course data first (required)
        const [courseRes, videosRes, notesRes] = await Promise.all([
          courseAPI.getCourseById(courseId),
          learningContentAPI.getLearningContentByCourse(courseId, 'video'),
          learningContentAPI.getLearningContentByCourse(courseId, 'note')
        ]);

        if (isMounted) {
          setCourse(courseRes.data.course);
          setVideos(videosRes.data.learningContent || []);
          setNotes(notesRes.data.learningContent || []);
          setHasAccess(true);

          if (videosRes.data.learningContent && videosRes.data.learningContent.length > 0) {
            setCurrentVideo(videosRes.data.learningContent[0]);
          }

          setLoading(false);
        }

        // Fetch lesson progress separately (optional - doesn't block page load)
        try {
          const progressRes = await lessonProgressAPI.getLessonProgress(courseId);
          if (isMounted && progressRes.data?.data?.completedLessonIds) {
            setCompletedLessonIds(progressRes.data.data.completedLessonIds);
          }
        } catch (progressError) {
          // Lesson progress API failure should not break the page
          console.log('Lesson progress fetch failed (non-critical):', progressError.message);
          // Continue without progress data - page still loads
        }
      } catch (error) {
        if (isMounted) {
          if (error.response?.status === 403) {
            setHasAccess(false);
            setLoading(false);
          } else {
            toast.error('Failed to load course content');
            setLoading(false);
          }
        }
      }
    };

    if (isMounted) {
      fetchCourseData();
    }

    return () => {
      isMounted = false;
    };
  }, [courseId]); // Only depend on courseId

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    setActiveContentType('video');
    setVideoError(false); // Reset error when selecting new video
  };

  const handleNoteSelect = (note) => {
    setCurrentNote(note);
    setActiveContentType('note');
  };

  const handleProgressUpdate = async (videoId) => {
    try {
      await dashboardAPI.updateProgress({
        courseId,
        videoId,
        completed: true
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  // NEW: Handle marking a lesson as complete
  const handleMarkComplete = async (lessonId) => {
    // Prevent duplicate submissions
    if (markingComplete) {
      console.log("Mark complete already in progress, ignoring duplicate submission");
      return;
    }

    // Check if already completed
    if (completedLessonIds.includes(lessonId)) {
      console.log("Lesson already completed, skipping");
      return;
    }

    setMarkingComplete(true);

    try {
      const response = await lessonProgressAPI.markLessonComplete({
        lessonId,
        courseId
      });

      if (response.data.success) {
        // Add the lesson ID to completed lessons
        setCompletedLessonIds(prev => [...prev, lessonId]);
        toast.success('Lesson marked as completed!');
      }
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      toast.error('Failed to mark lesson as completed');
    } finally {
      setMarkingComplete(false);
    }
  };

  // Helper function to check if current lesson is completed
  const isCurrentLessonCompleted = () => {
    const currentLessonId = activeContentType === 'video' ? currentVideo?._id : currentNote?._id;
    return currentLessonId && completedLessonIds.includes(currentLessonId);
  };

  // Helper function to check if previous lesson is completed (for Next button)
  const isPreviousLessonCompleted = () => {
    const currentIndex = videos.findIndex(v => v._id === currentVideo?._id);
    if (currentIndex <= 0) return true; // First lesson or no previous lesson
    
    const previousVideo = videos[currentIndex - 1];
    return completedLessonIds.includes(previousVideo._id);
  };

  const handlePrevious = () => {
    const currentIndex = videos.findIndex(v => v._id === currentVideo?._id);
    if (currentIndex > 0) {
      setCurrentVideo(videos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    // Prevent skipping lessons - only allow next if current lesson is completed
    if (!isCurrentLessonCompleted()) {
      toast.error('Please complete the current lesson before moving to the next one');
      return;
    }

    const currentIndex = videos.findIndex(v => v._id === currentVideo?._id);
    if (currentIndex < videos.length - 1) {
      setCurrentVideo(videos[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-700">Course not found</h2>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have access to this course. Please enroll to view the content.</p>
          <motion.button
            onClick={() => navigate('/courses')}
            whileHover={{ scale: 1.02 }}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition font-semibold"
          >
            Browse Courses
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-purple-600 hover:text-purple-800 font-semibold mb-4 inline-block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-gray-600">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeContentType === 'video' && currentVideo && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="aspect-video bg-black">
                  {videoError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <div className="text-center p-8">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Video Unavailable</h3>
                        <p className="text-gray-300 mb-4">This video cannot be embedded. It may be private or the link is invalid.</p>
                        <a
                          href={currentVideo.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition font-semibold"
                        >
                          Open Video in New Tab
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      key={currentVideo._id}
                      src={getEmbedVideoUrl(currentVideo.videoUrl)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentVideo.title}
                      onError={() => setVideoError(true)}
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{currentVideo.title}</h2>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {getVideoProvider(currentVideo.videoUrl) === 'youtube' ? 'YouTube' : 
                       getVideoProvider(currentVideo.videoUrl) === 'vimeo' ? 'Vimeo' :
                       getVideoProvider(currentVideo.videoUrl) === 'drive' ? 'Google Drive' : 
                       getVideoProvider(currentVideo.videoUrl) === 'dropbox' ? 'Dropbox' : 'Video'}
                    </span>
                  </div>
                  {currentVideo.description && (
                    <p className="text-gray-600 mb-4">{currentVideo.description}</p>
                  )}
                  {currentVideo.duration && (
                    <p className="text-sm text-gray-500 mb-4">Duration: {currentVideo.duration}</p>
                  )}

                  <div className="flex gap-4">
                    <motion.button
                      onClick={handlePrevious}
                      whileHover={{ scale: 1.05 }}
                      disabled={videos.findIndex(v => v._id === currentVideo._id) === 0}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      ← Previous
                    </motion.button>

                    <motion.button
                      onClick={() => handleMarkComplete(currentVideo._id)}
                      whileHover={{ scale: 1.05 }}
                      disabled={isCurrentLessonCompleted() || markingComplete}
                      className={`px-6 py-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                        isCurrentLessonCompleted()
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {markingComplete ? 'Marking...' : isCurrentLessonCompleted() ? 'Completed ✓' : 'Mark as Read'}
                    </motion.button>

                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.05 }}
                      disabled={!isCurrentLessonCompleted() || videos.findIndex(v => v._id === currentVideo._id) === videos.length - 1}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {activeContentType === 'note' && currentNote && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentNote.title}</h2>
                  {currentNote.description && (
                    <p className="text-gray-600 mb-4">{currentNote.description}</p>
                  )}
                </div>
                <div className="aspect-[3/4] bg-gray-100">
                  <iframe
                    src={currentNote.pdfUrl}
                    className="w-full h-full"
                    title={currentNote.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-4">
                    <motion.button
                      onClick={() => handleMarkComplete(currentNote._id)}
                      whileHover={{ scale: 1.05 }}
                      disabled={isCurrentLessonCompleted() || markingComplete}
                      className={`px-6 py-2 rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                        isCurrentLessonCompleted()
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {markingComplete ? 'Marking...' : isCurrentLessonCompleted() ? 'Completed ✓' : 'Mark as Read'}
                    </motion.button>

                    <a
                      href={currentNote.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition font-semibold"
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeContentType === 'video' && videos.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">📹</div>
                <p className="text-gray-600">No videos available for this course yet.</p>
              </div>
            )}

            {activeContentType === 'note' && notes.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-600">No notes available for this course yet.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex gap-2 mb-6">
                <motion.button
                  onClick={() => setActiveContentType('video')}
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                    activeContentType === 'video'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Videos
                </motion.button>
                <motion.button
                  onClick={() => setActiveContentType('note')}
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                    activeContentType === 'note'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Notes
                </motion.button>
              </div>

              {activeContentType === 'video' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Course Videos</h3>
                  {videos.map((video, index) => {
                    const isCompleted = completedLessonIds.includes(video._id);
                    const isCurrent = currentVideo?._id === video._id;
                    const isLocked = index > 0 && !completedLessonIds.includes(videos[index - 1]._id);
                    
                    return (
                      <motion.div
                        key={video._id}
                        whileHover={{ scale: isLocked ? 1 : 1.02 }}
                        onClick={() => !isLocked && handleVideoSelect(video)}
                        className={`p-4 rounded-lg cursor-pointer transition border-2 ${
                          isCurrent
                            ? 'border-purple-500 bg-purple-50'
                            : isLocked
                            ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            {video.thumbnail ? (
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-20 h-14 object-cover rounded"
                              />
                            ) : (
                              <div className="w-20 h-14 bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-2xl">📹</span>
                              </div>
                            )}
                            {isCompleted && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                ✓
                              </div>
                            )}
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
                                <span className="text-white text-xl">🔒</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold text-sm mb-1 ${
                              isLocked ? 'text-gray-400' : 'text-gray-800'
                            }`}>
                              {index + 1}. {video.title}
                            </p>
                            {video.duration && (
                              <p className="text-xs text-gray-500">{video.duration}</p>
                            )}
                            {isCompleted && (
                              <p className="text-xs text-green-600 font-semibold mt-1">Completed</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {videos.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No videos added yet</p>
                  )}
                </div>
              )}

              {activeContentType === 'note' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Course Notes</h3>
                  {notes.map((note, index) => {
                    const isCompleted = completedLessonIds.includes(note._id);
                    const isCurrent = currentNote?._id === note._id;
                    
                    return (
                      <motion.div
                        key={note._id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNoteSelect(note)}
                        className={`p-4 rounded-lg cursor-pointer transition border-2 ${
                          isCurrent
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                              <span className="text-2xl">📄</span>
                            </div>
                            {isCompleted && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm mb-1">
                              {note.title}
                            </p>
                            {note.description && (
                              <p className="text-xs text-gray-500 line-clamp-2">{note.description}</p>
                            )}
                            {isCompleted && (
                              <p className="text-xs text-green-600 font-semibold mt-1">Completed</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {notes.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No notes added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
