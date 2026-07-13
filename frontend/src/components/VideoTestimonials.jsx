import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialAPI } from '../services/api';
import UniversalVideoPlayer from './UniversalVideoPlayer';

const VideoTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialAPI.getAllTestimonials();
      const activeTestimonials = response.data.testimonials.filter(t => t.isActive);
      setTestimonials(activeTestimonials);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    
    return [
      { testimonial: testimonials[prevIndex], position: 'left', index: prevIndex },
      { testimonial: testimonials[currentIndex], position: 'center', index: currentIndex },
      { testimonial: testimonials[nextIndex], position: 'right', index: nextIndex }
    ];
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-[600px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="relative min-h-[700px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden py-16 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Real success stories from DigiQuest learners
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {/* Previous Button */}
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Videos Container */}
          <div className="relative flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map(({ testimonial, position, index }) => {
                const isCenter = position === 'center';
                
                return (
                  <motion.div
                    key={`${testimonial._id}-${position}`}
                    initial={{
                      scale: isCenter ? 0.8 : 0.6,
                      opacity: isCenter ? 0 : 0.3,
                      rotateY: position === 'left' ? 15 : position === 'right' ? -15 : 0,
                      x: position === 'left' ? -100 : position === 'right' ? 100 : 0
                    }}
                    animate={{
                      scale: isCenter ? 1 : 0.7,
                      opacity: isCenter ? 1 : 0.4,
                      rotateY: position === 'left' ? 15 : position === 'right' ? -15 : 0,
                      x: 0,
                      filter: isCenter ? 'blur(0px)' : 'blur(4px)'
                    }}
                    exit={{
                      scale: isCenter ? 0.6 : 0.4,
                      opacity: 0,
                      rotateY: position === 'left' ? -15 : position === 'right' ? 15 : 0,
                      x: position === 'left' ? -100 : position === 'right' ? 100 : 0
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    className={`relative rounded-2xl overflow-hidden ${
                      isCenter 
                        ? 'w-[280px] h-[500px] md:w-[320px] md:h-[570px] shadow-2xl shadow-purple-500/30 z-10' 
                        : 'w-[200px] h-[360px] md:w-[240px] md:h-[425px] shadow-xl z-0'
                    }`}
                    style={{
                      aspectRatio: '9/16'
                    }}
                  >
                    {/* Glassmorphism Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20"></div>
                    
                    {/* Video Container */}
                    <div className="relative w-full h-full">
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

                      {/* Overlay with student info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6">
                        <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                          {testimonial.studentName}
                        </h3>
                        {testimonial.designation && (
                          <p className="text-gray-300 text-sm mb-2">
                            {testimonial.designation}
                          </p>
                        )}
                        <p className="text-purple-300 text-sm font-medium">
                          {testimonial.courseName}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg hover:shadow-purple-500/50"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-purple-500 w-6 md:w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
