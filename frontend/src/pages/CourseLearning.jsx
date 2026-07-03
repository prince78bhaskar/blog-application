import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { courseAPI, dashboardAPI } from '../services/api';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const [courseRes, videosRes, notesRes] = await Promise.all([
        courseAPI.getCourseById(courseId),
        courseAPI.getCourseVideos(courseId),
        courseAPI.getCourseNotes(courseId)
      ]);

      setCourse(courseRes.data.course);
      setVideos(videosRes.data.videos);
      setNotes(notesRes.data.notes);

      if (videosRes.data.videos.length > 0) {
        setCurrentVideo(videosRes.data.videos[0]);
      }

      setLoading(false);
    } catch (error) {
      toast.error('Failed to load course content');
      setLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
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

  const handlePrevious = () => {
    const currentIndex = videos.findIndex(v => v._id === currentVideo?._id);
    if (currentIndex > 0) {
      setCurrentVideo(videos[currentIndex - 1]);
    }
  };

  const handleNext = () => {
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

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'w-80' : 'w-0'
          } bg-gray-800 transition-all duration-300 overflow-hidden`}
        >
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Course Videos</h3>
            <div className="space-y-2">
              {videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleVideoSelect(video)}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    currentVideo?._id === video._id
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <p className="font-semibold text-sm">
                    {index + 1}. {video.title}
                  </p>
                  <p className="text-xs text-gray-300">{video.duration}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {notes.length > 0 && (
            <div className="p-4 border-t border-gray-700">
              <h3 className="text-lg font-bold mb-4">Course Notes</h3>
              <div className="space-y-2">
                {notes.map((note, index) => (
                  <a
                    key={index}
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                  >
                    <p className="font-semibold text-sm">📄 {note.title}</p>
                    <p className="text-xs text-gray-300 uppercase">{note.fileType}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1">
          <div className="p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mb-4 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              {sidebarOpen ? '☰ Hide Sidebar' : '☰ Show Sidebar'}
            </button>

            {currentVideo && (
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-video bg-black">
                  <video
                    key={currentVideo._id}
                    controls
                    autoPlay
                    className="w-full h-full"
                  >
                    <source src={currentVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                  <p className="text-gray-300 mb-4">{currentVideo.description}</p>

                  <div className="flex gap-4">
                    <motion.button
                      onClick={handlePrevious}
                      whileHover={{ scale: 1.05 }}
                      disabled={videos.findIndex(v => v._id === currentVideo._id) === 0}
                      className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </motion.button>

                    <motion.button
                      onClick={() => handleProgressUpdate(currentVideo._id)}
                      whileHover={{ scale: 1.05 }}
                      className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      ✓ Mark as Completed
                    </motion.button>

                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.05 }}
                      disabled={videos.findIndex(v => v._id === currentVideo._id) === videos.length - 1}
                      className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {videos.length === 0 && (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400">No videos available for this course yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseLearning;
