import React, { useState } from "react";
import placement from '../assets/palcement.png'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import placementBg from "../assets/placement.png";
import { motion, AnimatePresence } from "framer-motion";


function Placement() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (



        <div className="bg-gray-50">

        <header className="sticky top-0 z-50 bg-gray-100 shadow-md">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
         
             {/* Logo */}
             <motion.img
               src={logo}
               alt="Logo"
               className="w-24 sm:w-32 md:w-40 cursor-pointer"
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.3 }}
             />
         
             {/* Desktop Navigation */}
             <ul className="hidden md:flex items-center justify-center gap-8 text-gray-700 font-semibold text-base">
         
               <Link to="/">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   Home
                 </motion.li>
               </Link>
         
               <Link to="/About">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   About Us
                 </motion.li>
               </Link>
         
               <Link to="/placement">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   Placement
                 </motion.li>
               </Link>
         
               <Link to="/Course">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   Courses
                 </motion.li>
               </Link>
         
               {/* <Link to="/Enroll">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   Enroll
                 </motion.li>
               </Link> */}
    
                <Link to="/login">
                 <motion.li
                   whileHover={{ y: -3, color: "#2563eb" }}
                   transition={{ duration: 0.2 }}
                   className="cursor-pointer"
                 >
                   Login
                 </motion.li>
               </Link>
         
             </ul>
         
             {/* Mobile Menu Button */}
             <button
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               className="md:hidden text-3xl"
             >
               {mobileMenuOpen ? "✕" : "☰"}
             </button>
           </div>
         
           {/* Mobile Menu Animation */}
           <AnimatePresence>
             {mobileMenuOpen && (
               <motion.div
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
                 className="md:hidden bg-gray-200"
               >
                 <ul className="flex flex-col items-center gap-5 py-6 font-semibold text-gray-700">
         
                   <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                     <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                       Home
                     </motion.li>
                   </Link>
         
                   <Link to="/About" onClick={() => setMobileMenuOpen(false)}>
                     <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                       About Us
                     </motion.li>
                   </Link>
         
                   <Link to="/placement" onClick={() => setMobileMenuOpen(false)}>
                     <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                       Placement
                     </motion.li>
                   </Link>
         
                   <Link to="/Course" onClick={() => setMobileMenuOpen(false)}>
                     <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                       Courses
                     </motion.li>
                   </Link>
         
                   {/* <Link to="/Enroll" onClick={() => setMobileMenuOpen(false)}>
                     <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                       Enroll
                     </motion.li>
                   </Link> */}
         
                 </ul>
               </motion.div>
             )}
           </AnimatePresence>
         </header>


            {/* About Placement */}

            <section >

                <div className="text-white py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(50,0,0,0.6), rgba(0,0,50,0.6)), url(${placementBg})`,
                  }}>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center" >

                        <h2 data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            Placement Support
                        </h2>

                        <p data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 md:mt-8 max-w-4xl mx-auto leading-7 sm:leading-8 md:leading-9">
                            At DigiQuestPC, our placement support is focused on helping
                            students build confidence, improve technical knowledge,
                            and prepare for real company interviews.
                        </p>

                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center mt-12 sm:mt-16 md:mt-20 lg:mt-20 px-4 sm:px-6 max-w-7xl mx-auto">

  {/* Image */}

  <div
  data-aos="fade-right"
  className="overflow-hidden rounded-2xl sm:rounded-3xl lg:pl-8"
>
  <img
    src={placement}
    alt="Placement Support"
    className="w-full rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
  />
</div>

  {/* Content */}
  <div data-aos="fade-left">

    <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs sm:text-sm">
      Career Support
    </span>

    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mt-3 sm:mt-5 leading-tight">
      Building Careers,
      <span className="text-blue-600"> Not Just Skills</span>
    </h2>

    <p className="mt-4 sm:mt-5 md:mt-6 text-gray-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8">
      We prepare every student for today's competitive job market through
      practical training, live projects, and expert career guidance.
    </p>

    <p className="mt-3 sm:mt-4 md:mt-5 text-gray-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8">
      From resume building and mock interviews to communication skills and
      placement assistance, we support you at every step of your career journey.
    </p>

    {/* Highlights */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">

      <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-xl sm:text-2xl">✔</span>
        <span className="font-medium text-gray-700 text-sm sm:text-base">Resume Building</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-xl sm:text-2xl">✔</span>
        <span className="font-medium text-gray-700 text-sm sm:text-base">Mock Interviews</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-xl sm:text-2xl">✔</span>
        <span className="font-medium text-gray-700 text-sm sm:text-base">Soft Skills</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-xl sm:text-2xl">✔</span>
        <span className="font-medium text-gray-700 text-sm sm:text-base">Placement Assistance</span>
      </div>

    </div>

  </div>

</div>

            </section>

            {/* Why Choose */}

            <section className="bg-blue-50 py-12 sm:py-16 md:py-20 lg:py-24">

                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div data-aos="fade-up" className="text-center">

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">
                            Why Our Placement Program?
                        </h2>

                        <p className="text-gray-600 mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base">
                            Everything you need to become job-ready.
                        </p>

                    </div>

                    <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mt-12 sm:mt-14 md:mt-16">

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 md:p-8 hover:shadow-lg duration-500 hover:-translate-y-6 border border-gray-700">

                            <div className="text-4xl sm:text-5xl">📄</div>

                            <h3 className="font-bold text-lg sm:text-xl mt-4 sm:mt-5">
                                Resume Building
                            </h3>

                            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
                                Create professional resumes that impress recruiters.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 md:p-8 hover:-translate-y-6 hover:shadow-2xl duration-500 border border-gray-700">

                            <div className="text-4xl sm:text-5xl">🎤</div>

                            <h3 className="font-bold text-lg sm:text-xl mt-4 sm:mt-5">
                                Mock Interviews
                            </h3>

                            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
                                Practice technical and HR interviews with mentors.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 md:p-8 hover: shadow-2xl duration-500 hover:-translate-y-6 border border-gray-700">

                            <div className="text-4xl sm:text-5xl">💬</div>

                            <h3 className="font-bold text-lg sm:text-xl mt-4 sm:mt-5">
                                Soft Skills
                            </h3>

                            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
                                Improve communication and professional confidence.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 md:p-8 hover:shadow-2xl duration-500 hover:-translate-y-6 border border-gray-700">

                            <div className="text-4xl sm:text-5xl">💼</div>

                            <h3 className="font-bold text-lg sm:text-xl mt-4 sm:mt-5">
                                Placement Assistance
                            </h3>

                            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
                                Continuous guidance until you get your first job.
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            {/* Placement Process */}

          <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">

  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center" data-aos="fade-up">

      <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-xs sm:text-sm">
        PLACEMENT JOURNEY
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-5">
        Our Placement Process
      </h2>

      <p className="mt-4 sm:mt-5 md:mt-5 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
        Follow our structured learning path that transforms students into
        industry-ready professionals.
      </p>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mt-12 sm:mt-14 md:mt-16">

      {/* Card 1 */}
      <div
        data-aos="fade-up"
        className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto group-hover:scale-110 transition">
          1
        </div>

        <h3 className="mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl font-bold text-center">
          Learn Skills
        </h3>

        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base text-center leading-6 sm:leading-7">
          Master industry-relevant technologies through practical classroom
          and lab-based learning.
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto group-hover:scale-110 transition">
          2
        </div>

        <h3 className="mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl font-bold text-center">
          Live Projects
        </h3>

        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base text-center leading-6 sm:leading-7">
          Build real-world projects to strengthen your portfolio and gain
          hands-on experience.
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto group-hover:scale-110 transition">
          3
        </div>

        <h3 className="mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl font-bold text-center">
          Interview Prep
        </h3>

        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base text-center leading-6 sm:leading-7">
          Resume building, aptitude practice, mock interviews and
          communication skill training.
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto group-hover:scale-110 transition">
          4
        </div>

        <h3 className="mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl md:text-2xl font-bold text-center">
          Get Placed
        </h3>

        <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base text-center leading-6 sm:leading-7">
          Attend company interviews with confidence and launch your
          professional career.
        </p>
      </div>

    </div>

  </div>

</section>

            {/* Placement Highlights */}
<section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center" data-aos="fade-up">
      <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-white/10 border border-white/20 rounded-full text-blue-100 font-semibold text-xs sm:text-sm">
        WHY CHOOSE DIGIQUEST PC
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-5">
        Learn. Build. Grow.
      </h2>

      <p className="mt-4 sm:mt-5 text-blue-100 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
        We focus on practical learning, real-world projects, career guidance,
        and interview preparation to help students become industry-ready
        professionals.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 mt-12 sm:mt-14 md:mt-16">

      {/* Card 1 */}
      <div
        data-aos="zoom-in"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 group-hover:scale-110 transition">
          💻
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold">
          Practical Learning
        </p>

        <p className="mt-2 text-sm text-blue-100">
          Learn by building real projects instead of only studying theory.
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-300 group-hover:scale-110 transition">
          🚀
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold">
          Live Projects
        </p>

        <p className="mt-2 text-sm text-blue-100">
          Gain hands-on experience through practical assignments and projects.
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-300 group-hover:scale-110 transition">
          🎯
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold">
          Interview Preparation
        </p>

        <p className="mt-2 text-sm text-blue-100">
          Resume building, mock interviews, and career guidance for students.
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-300 group-hover:scale-110 transition">
          🤝
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold">
          Career Support
        </p>

        <p className="mt-2 text-sm text-blue-100">
          Continuous mentorship and support to help you achieve your career goals.
        </p>
      </div>

    </div>
  </div>
</section>

          
            {/* Student Success */}

    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">

    {/* Heading */}
    <div className="text-center mb-12 sm:mb-14 md:mb-16" data-aos="fade-up">

      <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm">
        SUCCESS STORIES
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-5 text-gray-900">
        👨‍💻 Developer Stories
      </h2>

      <p className="mt-4 sm:mt-5 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-6 sm:leading-7">
        Real experiences from developers who transformed their careers
        with our practical training, live projects and placement support.
      </p>

    </div>

    {/* Cards */}

    <div
      data-aos="fade-up"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
    >

      {/* Card 1 */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
            👨‍💻
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Sagar Patel
            </h3>

            <p className="text-blue-600 font-medium text-sm sm:text-base">
              Full Stack Developer
            </p>

            <span className="text-xs sm:text-sm text-gray-500">
              Joined: Sept 2024
            </span>
          </div>

        </div>

        <p className="mt-5 sm:mt-6 text-gray-600 leading-7 sm:leading-8 italic text-sm sm:text-base">
          "The MERN Stack training was comprehensive and practical.
          Our instructors explained every concept with real-world
          examples. Within 3 months I secured a placement at a
          startup with excellent career growth."
        </p>

        <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 flex justify-between items-center gap-4">

          <div>
            <p className="text-xs sm:text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              TechStartup Inc
            </h4>
          </div>

          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Package</p>
            <h4 className="text-xl sm:text-2xl font-bold text-green-600">
              ₹8.5 LPA
            </h4>
          </div>

        </div>

      </div>

      {/* Card 2 */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-pink-600 text-white flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
            👩‍💻
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Neha Sharma
            </h3>

            <p className="text-pink-600 font-medium text-sm sm:text-base">
              Python Full Stack Developer
            </p>

            <span className="text-xs sm:text-sm text-gray-500">
              Joined: Aug 2024
            </span>
          </div>

        </div>

        <p className="mt-5 sm:mt-6 text-gray-600 leading-7 sm:leading-8 italic text-sm sm:text-base">
          "The hands-on projects and one-to-one mentorship completely
          transformed my learning journey. The placement team
          supported me until I received my dream offer."
        </p>

        <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 flex justify-between items-center gap-4">

          <div>
            <p className="text-xs sm:text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              Tech Solutions
            </h4>
          </div>

          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Package</p>
            <h4 className="text-xl sm:text-2xl font-bold text-green-600">
              ₹10 LPA
            </h4>
          </div>

        </div>

      </div>

      {/* Card 3 */}

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-3 sm:gap-4">

          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
            🎨
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Vikram Singh
            </h3>

            <p className="text-purple-600 font-medium text-sm sm:text-base">
              UI/UX Designer
            </p>

            <span className="text-xs sm:text-sm text-gray-500">
              Joined: Oct 2024
            </span>
          </div>

        </div>

        <p className="mt-5 sm:mt-6 text-gray-600 leading-7 sm:leading-8 italic text-sm sm:text-base">
          "Amazing learning experience with industry mentors.
          The portfolio projects we built helped me secure
          a design role at a leading company."
        </p>

        <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6 flex justify-between items-center gap-4">

          <div>
            <p className="text-xs sm:text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              Design Studio
            </h4>
          </div>

          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-500">Package</p>
            <h4 className="text-xl sm:text-2xl font-bold text-green-600">
              ₹7.5 LPA
            </h4>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>

         {/* ================= Call To Action ================= */}
         
               <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white"
                  style={{
             backgroundImage: `linear-gradient(rgba(50,0,0,0.6), rgba(0,0,50,0.6)), url(${placementBg})`,
           }} >
             
                    
           {/* Background Blur Effects */}
           <div className="absolute -top-20 -left-20 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute -bottom-20 -right-20 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
         
           <div
             data-aos="zoom-in"
             className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
           >
             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-center">
         
         
               <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 sm:mt-6 leading-tight">
                 Start Your Learning
                 <span className="block text-cyan-300">
                   Journey Today
                 </span>
               </h2>
         
               <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-6 sm:leading-7 md:leading-8">
                 Learn from industry experts, build real-world projects,
                 earn certification, and get dedicated placement support
                 to launch your career.
               </p>
         
          
               {/* Buttons */}
               <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12">
         
                 <Link to="/Enroll">
                   <button className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl bg-white text-blue-700 font-bold text-sm sm:text-base md:text-lg shadow-lg hover:bg-cyan-300 hover:text-slate-900 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                     Enroll Now →
                   </button>
                 </Link>
         
                 <Link to="/Course">
                   <button className="px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border-2 border-white font-semibold text-sm sm:text-base md:text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 w-full sm:w-auto">
                     Explore Courses
                   </button>
                 </Link>
         
               </div>
         
             </div>
           </div>
         
         </section>
        <footer className="bg-slate-900 text-white">
      
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 py-12 sm:py-14 md:py-16 px-4 sm:px-6">
      
                {/* ================= COLUMN 1 ================= */}
                <div data-aos="fade-up">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    DigiQuestPC
                  </h2>
      
                  <p className="mt-4 sm:mt-5 text-gray-300 leading-7 sm:leading-8 text-sm sm:text-base">
                    Upskill with practical training, mentorship and placement support.
                  </p>
      
                  <p className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm">
                    © 2026 DigiQuestPC. All Rights Reserved.
                  </p>
                </div>
      
                {/* ================= QUICK LINKS ================= */}
              <div data-aos="fade-up" data-aos-delay="200">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Quick Links
        </h2>
      
        <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300 text-sm sm:text-base">
          <li>
            <Link to="/" className="hover:text-blue-400 cursor-pointer">
              Home
            </Link>
          </li>
      
          <li>
            <Link to="/about" className="hover:text-blue-400 cursor-pointer">
              About Us
            </Link>
          </li>
      
          <li>
            <Link to="/placement" className="hover:text-blue-400 cursor-pointer">
              Placement
            </Link>
          </li>
      
          <li>
            <a
                  href="https://wa.me/919236398129?text=Hello%20DigiQuestPC,%20I%20want%20to%20know%20about%20your%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="hover:text-blue-400 cursor-pointer" >
                     Contact
                  </button>
                </a>
          </li>
        </ul>
      </div>
      
                {/* ================= COURSES ================= */}
                <div data-aos="fade-up" data-aos-delay="300">
      
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Courses
                  </h2>
      
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300 text-sm sm:text-base">
      
                    <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                      Full Stack Development
                      </Link>
                    </li>
      
                    <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                        Python Programming
                      </Link>
                    </li>
      
                    <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                        Java Programming
                      </Link>
                    </li>
      
                    <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                        Data Analytics
                      </Link>
                    </li>
      
                    {/* <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                        Cloud Computing
                      </Link>
                    </li> */}
      
                    <li>
                      <Link to="/Course" className="hover:text-blue-400 cursor-pointer">
                        Digital Marketing
                      </Link>
                    </li>
      
                  </ul>
      
                </div>
      
                {/* ================= CONTACT ================= */}
                <div data-aos="fade-up" data-aos-delay="400">
      
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Contact
                  </h2>
      
                  <p className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base">
                    📞 +91 92363 98129
                  </p>
      
                  <button>
                    <a
                      href="mailto:digiquestpc@gmail.com"
                      className="mt-4 sm:mt-6 inline-block text-blue-400 hover:text-blue-300 transition cursor-pointer text-sm sm:text-base"
                    >
                      📧 digiquestpc@gmail.com
                    </a>
                  </button>
{/*       
                  <Link to='/Enroll'>
                    <div className="mt-4 sm:mt-6 inline-block text-blue-400 hover:text-blue-300 transition cursor-pointer text-sm sm:text-base">
                      → Enroll Now
                    </div>
                  </Link> */}
      
                </div>
      
              </div>
      
            </footer>
      
            

        </div>
    );
}

export default Placement;