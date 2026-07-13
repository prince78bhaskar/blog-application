import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialAPI } from "../services/api";
import UniversalVideoPlayer from "./UniversalVideoPlayer";

const VideoTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialAPI.getAllTestimonials();

      const activeTestimonials =
        response?.data?.testimonials?.filter(
          (item) => item.isActive === true
        ) || [];

      setTestimonials(activeTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const getVisibleTestimonials = () => {
    if (!testimonials.length) return [];

    // Mobile -> only center card
    if (window.innerWidth < 768) {
      return [
        {
          testimonial: testimonials[currentIndex],
          position: "center",
        },
      ];
    }

    const prev =
      currentIndex === 0
        ? testimonials.length - 1
        : currentIndex - 1;

    const next =
      currentIndex === testimonials.length - 1
        ? 0
        : currentIndex + 1;

    return [
      {
        testimonial: testimonials[prev],
        position: "left",
      },
      {
        testimonial: testimonials[currentIndex],
        position: "center",
      },
      {
        testimonial: testimonials[next],
        position: "right",
      },
    ];
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-black py-24 flex justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-purple-500 border-t-transparent"></div>
      </section>
    );
  }

  if (!testimonials.length) return null;

  const visibleTestimonials = getVisibleTestimonials();
    return (

<div className="relative w-full flex items-center justify-center mb-10 p-10">

  {/* Previous */}
  <button
    onClick={handlePrevious}
    aria-label="Previous"
    className="absolute left-2 md:left-6 z-30
    w-10 h-10 md:w-14 md:h-14
    rounded-full
    bg-black/60
    backdrop-blur-md
    border border-white/20
    text-white
    flex items-center justify-center
    hover:bg-purple-600
    transition"
  >
    <svg
      className="w-5 h-5 md:w-7 md:h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>

  {/* Cards */}
  <div className="flex items-center justify-center w-full max-w-5xl gap-4 overflow-hidden">

    {visibleTestimonials.map(({ testimonial, position }) => {

      const isCenter = position === "center";

      return (

        <motion.div
          key={`${testimonial._id}-${position}`}
          initial={{
            opacity: 0,
            scale: .8
          }}
          animate={{
            opacity: 1,
            scale: isCenter ? 1 : .8
          }}
          transition={{
            duration: .4
          }}
          className={`
            flex-shrink-0
            overflow-hidden
            rounded-3xl
            transition-all duration-500

            ${
              isCenter
                ? "w-[300px] h-[540px] z-20 shadow-2xl"
                : "w-[210px] h-[380px] opacity-50 blur-[2px]"
            }
          `}
        >

          <UniversalVideoPlayer
            videoUrl={testimonial.videoUrl}
            thumbnail={testimonial.thumbnail}
            autoPlay={isCenter}
            muted
            controls={isCenter}
            loop={false}
            playsInline
            className="w-full h-full object-cover"
          />

   
        </motion.div>

      );

    })}

  </div>

  {/* Next */}

  <button
    onClick={handleNext}
    aria-label="Next"
    className="absolute right-2 md:right-6 z-30
    w-10 h-10 md:w-14 md:h-14
    rounded-full
    bg-black/60
    backdrop-blur-md
    border border-white/20
    text-white
    flex items-center justify-center
    hover:bg-purple-600
    transition"
  >
    <svg
      className="w-5 h-5 md:w-7 md:h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>

</div>
  );
};

export default VideoTestimonials;