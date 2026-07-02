import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import coursebanner from '../assets/coursebg.jpg'
import { motion, AnimatePresence } from "framer-motion";

function Course() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    
      const fullstack = " Learn to build complete web applications from scratch using HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. Gain hands-on experience through real-world projects, APIs, authentication, and database integration. Develop responsive, scalable, and industry-ready applications while mastering both frontend and backend development."

      const python = "Master Python programming from basics to advanced concepts. Learn object-oriented programming, data structures, and algorithms. Build real-world projects using Django, Flask, and APIs. Gain practical experience in web development, data analysis, and automation with Python."

      const dataAnalytics = "Learn to analyze and visualize data using Excel, SQL, and Power BI. Gain skills in data cleaning, transformation, and dashboard creation. Understand statistical analysis, data modeling, and reporting techniques. Develop the ability to derive insights from data and make informed business decisions."

      const java = "Learn Core Java programming, object-oriented concepts, and advanced features. Build desktop and web applications using Java, JDBC, Servlets, and JSP. Gain hands-on experience with real-world projects, data structures, and algorithms. Develop problem-solving skills and become proficient in Java development."

      const cAndCpp = "Build a strong programming foundation with C and C++. Learn data structures, algorithms, and object-oriented programming. Gain hands-on experience through practical coding exercises and projects. Develop problem-solving skills and become proficient in C and C++ programming for software development."

      const digitalMarketing = "Master digital marketing strategies including SEO, social media marketing, Google Ads, and branding. Learn to create effective campaigns, analyze performance metrics, and optimize online presence. Gain practical skills in content marketing, email marketing, and digital advertising to drive business growth."


    

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
     
           <Link to="/Enroll">
             <motion.li
               whileHover={{ y: -3, color: "#2563eb" }}
               transition={{ duration: 0.2 }}
               className="cursor-pointer"
             >
               Enroll
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
     
               <Link to="/Enroll" onClick={() => setMobileMenuOpen(false)}>
                 <motion.li whileHover={{ scale: 1.05, color: "#2563eb" }}>
                   Enroll
                 </motion.li>
               </Link>
     
             </ul>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
            {/* Hero Section */}
            <section>
                <div
                    className="text-white py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,100,0.6), rgba(0,0,100,0.6)), url(${coursebanner})`,
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">

                        <h1
                            data-aos="fade-up"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                        >
                            Our Courses
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-7 sm:leading-8 md:leading-9 text-gray-200"
                        >
                            Learn industry-ready skills through practical training,
                            live projects, expert mentorship, and placement support.
                            Choose the course that matches your career goals and
                            start your journey toward a successful future.
                        </p>

                    </div>
                </div>
            </section>

            {/* Courses */}

            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="text-center">

                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">
                            Popular Courses
                        </h2>

                        <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base text-gray-600">
                            Choose the right course and start your career journey.
                        </p>

                    </div>

                    <div
                        data-aos="fade-up"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mt-10 sm:mt-12 lg:mt-14"
                    >

                        {/* Full Stack */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">💻</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                Full Stack Development
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 line-clamp-3">
                                HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.
                                  {fullstack.slice(0, 10)}...
                            </p>
                        
                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 6 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Full Stack Development",
                                            icon: "💻",
                                            duration: "6 Months",
                                            level: "Beginner",
                                            description: fullstack
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-lg sm:rounded-xl py-2 sm:py-2 text-sm sm:text-base hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>


                            </div>

                        </div>

                        {/* Python */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">🐍</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                Python Programming
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 line-clamp-3">
                                {python.slice(0, 50)}...
                            </p>
                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 4 Months</span>
                                <span>📘 Beginner</span>
                            </div>
                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Python Programming",
                                            icon: "🐍",
                                            duration: "4 Months",
                                            level: "Beginner",
                                            description:
                                                python  
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-lg sm:rounded-xl py-2 sm:py-2 text-sm sm:text-base hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>



                            </div>

                        </div>

                        {/* Data Analytics */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">📊</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                Data Analytics
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 line-clamp-3">
                                {dataAnalytics.slice(0, 50)}...
                            </p>

                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 5 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Data Analytics",
                                            icon: "📊",
                                            duration: "5 Months",
                                            level: "Intermediate",
                                            description:
                                                dataAnalytics
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-lg sm:rounded-xl py-2 sm:py-2 text-sm sm:text-base hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>



                            </div>
                      
                      

                        </div>

                        {/* Java */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">☕</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                Java Programming
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 line-clamp-3">
                                {java.slice(0, 50)}...
                            </p>

                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 4 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "☕",
                                            title: "Java Programming",
                                            duration: "4 Months",
                                            level: "Beginner",
                                            description:
                                                java
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-sm sm:text-base"
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>

                            </div>

                        </div>

                           {/* C & C++ */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">💻</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                C & C++
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 line-clamp-3">
                                {cAndCpp.slice(0, 50)}...
                            </p>

                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 3 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "💻",
                                            title: "C & C++",
                                            duration: "3 Months",
                                            level: "Beginner",
                                            description:
                                                cAndCpp
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-sm sm:text-base"
                                >
                                    View
                                </button>
                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>


                            </div>

                        </div>

                          {/* Digital Marketing */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-4xl sm:text-5xl">📱</div>

                            <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5">
                                Digital Marketing
                            </h3>

                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 line-clamp-3">
                                {digitalMarketing.slice(0, 50)}...
                            </p>

                            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
                                <span>⏳ 3 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "📱",
                                            title: "Digital Marketing",
                                            duration: "3 Months",
                                            level: "Beginner",
                                            description:
                                                digitalMarketing
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-sm sm:text-base"
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>

                            </div>

                        </div>

                       
                    </div>

                </div>

                {/* Popup */}
                {selectedCourse && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

                        <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">

                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-3 sm:top-4 right-4 sm:right-5 text-2xl sm:text-3xl"
                            >
                                &times;
                            </button>

                            <div className="text-5xl sm:text-6xl">{selectedCourse.icon}</div>

                            <h2 className="text-2xl sm:text-3xl font-bold mt-3 sm:mt-4">
                                {selectedCourse.title}
                            </h2>

                            <p className="mt-3 sm:mt-5 text-sm sm:text-base">
                                <strong>Duration:</strong> {selectedCourse.duration}
                            </p>

                            <p className="mt-2 text-sm sm:text-base">
                                <strong>Level:</strong> {selectedCourse.level}
                            </p>

                            <p className="mt-5 sm:mt-6 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
                                {selectedCourse.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-600 hover:text-white transition text-center text-sm sm:text-base">
                                        Enroll
                                    </li>
                                </Link>

                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="flex-1 border rounded-lg sm:rounded-xl py-2 sm:py-3 hover:bg-gray-100 text-sm sm:text-base"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>
                )}
                 
            </section>        

             {/* Why Learn With Us */}

         <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
            {/* bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 */}

  {/* Background Blur */}
  <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

    {/* Heading */}
    <div className="text-center mb-12 sm:mb-14 md:mb-16" data-aos="fade-down">
      <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-black font-semibold text-xs sm:text-sm">
        WHY CHOOSE US
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-3 sm:mt-5">
        Why Learn With
        <span className="text-blue-400"> DigiQuestPC?</span>
      </h2>

      <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-900 max-w-2xl mx-auto leading-7 sm:leading-8">
        Gain practical skills, build real-world projects, and get career
        guidance from experienced mentors to become industry-ready.
      </p>
    </div>

    {/* Cards */}
    <div
      data-aos="zoom-in-up"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8"
    >

      {/* Card 1 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-3xl sm:text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          👨‍🏫
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Expert Trainers
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Learn from experienced professionals with real industry knowledge
          and mentorship.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-3xl sm:text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          💻
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Practical Learning
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Build live projects, assignments and gain real-world coding
          experience.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-3xl sm:text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          📜
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Certification
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Receive an industry-recognized certificate after completing your
          course successfully.
        </p>
      </div>

      {/* Card 4 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-3xl sm:text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          💼
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Placement Support
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Resume building, interview preparation, career guidance and placement
          assistance.
        </p>
      </div>

    </div>

  </div>

</section>

            {/* Course Features */}

       <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">

  {/* Background Blur */}
  <div className="absolute top-10 left-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-10 right-10 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

    {/* Heading */}
    <div className="text-center mb-12 sm:mb-14 md:mb-16" data-aos="fade-down">
      <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-black font-semibold text-xs sm:text-sm">
        OUR FEATURES
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-3 sm:mt-5">
        Course <span className="text-blue-400">Features</span>
      </h2>

      <p className="text-gray-900 mt-4 sm:mt-5 md:mt-5 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base md:text-lg">
        Learn with practical training, expert guidance and career support
        designed to make you industry-ready.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">

      {/* Card 1 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          📚
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Live Classes
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Interactive live sessions with expert trainers and real practical
          demonstrations.
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(34,197,94,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          💻
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Hands-on Projects
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Build live projects that enhance your portfolio and practical
          experience.
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(249,115,22,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          🎓
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Certification
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Earn an industry-recognized certificate after completing your
          training.
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          📖
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Study Material
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Get complete notes, PDFs, assignments and practice exercises for
          every module.
        </p>
      </div>

      {/* Card 5 */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(236,72,153,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          🤝
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Doubt Support
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          One-to-one doubt sessions and mentor support whenever you need help.
        </p>
      </div>

      {/* Card 6 */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="group bg-white border border-black rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.35)] duration-500"
      >
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          💼
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mt-4 sm:mt-5 md:mt-6">
          Placement Assistance
        </h3>

        <p className="text-gray-900 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">
          Resume preparation, interview practice and dedicated placement
          support.
        </p>
      </div>

    </div>

  </div>
</section>

            {/* Learning Process */}

        <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">

  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-12 sm:mb-14 md:mb-16" data-aos="fade-down">
      <span className="inline-block px-4 sm:px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm">
        HOW IT WORKS
      </span>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-5">
        Learning <span className="text-blue-600">Process</span>
      </h2>

      <p className="mt-4 sm:mt-5 md:mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-7 sm:leading-8">
        Follow our simple step-by-step learning process and become
        industry-ready with practical knowledge and placement support.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Line */}
      <div className="hidden lg:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 relative">

        {/* Step 1 */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-6 sm:p-7 md:p-8 text-center"
        >
          <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 duration-500">
            1
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-800">
            Enroll
          </h3>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-6">
            Register for your preferred course and begin your journey.
          </p>
        </div>

        {/* Step 2 */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-6 sm:p-7 md:p-8 text-center"
        >
          <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 duration-500">
            2
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-800">
            Learn
          </h3>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-6">
            Attend live classes with expert trainers and mentors.
          </p>
        </div>

        {/* Step 3 */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-6 sm:p-7 md:p-8 text-center"
        >
          <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 duration-500">
            3
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-800">
            Practice
          </h3>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-6">
            Build real-world projects and strengthen your skills.
          </p>
        </div>

        {/* Step 4 */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-6 sm:p-7 md:p-8 text-center"
        >
          <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 duration-500">
            4
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-800">
            Get Certified
          </h3>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-6">
            Receive an industry-recognized certification after completion.
          </p>
        </div>

        {/* Step 5 */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-6 sm:p-7 md:p-8 text-center"
        >
          <div className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold group-hover:scale-110 duration-500">
            5
          </div>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-5 md:mt-6 text-gray-800">
            Get Placed
          </h3>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base leading-6">
            Get placement assistance, mock interviews and career guidance.
          </p>
        </div>

      </div>
    </div>

  </div>

</section>

            {/* Call To Action */}

           <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

  {/* Background Blur Effects */}
  <div className="absolute -top-20 -left-20 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

  <div
    data-aos="zoom-in"
    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
  >
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-center">

      <span className="inline-block px-4 sm:px-5 py-1 sm:py-2 rounded-full bg-white/20 text-blue-100 font-semibold text-xs sm:text-sm">
        🚀 Join DigiQuestPC
      </span>

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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10">

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300">
            500+
          </h3>
          <p className="text-blue-100 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Students
          </p>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300">
            20+
          </h3>
          <p className="text-blue-100 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Courses
          </p>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-300">
            100%
          </h3>
          <p className="text-blue-100 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Support
          </p>
        </div>

      </div>

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
                      
                              <li className="hover:text-blue-400 cursor-pointer">Home</li>
                              <li className="hover:text-blue-400 cursor-pointer">About Us</li>
                              <li className="hover:text-blue-400 cursor-pointer">Placement</li>
                              <li className="hover:text-blue-400 cursor-pointer">Contact</li>
                      
                            </ul>
                      
                          </div>
                      
                          {/* ================= COURSES ================= */}
                          <div data-aos="fade-up" data-aos-delay="300">
                      
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                              Courses
                            </h2>
                      
                            <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-gray-300 text-sm sm:text-base">
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Full Stack Development
                              </li>
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Python Programming
                              </li>
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Java Programming
                              </li>
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Data Analytics
                              </li>
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Cloud Computing
                              </li>
                      
                              <li className="hover:text-blue-400 cursor-pointer">
                                Digital Marketing
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
                      
                            <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base">
                              📧 digiquestpc@gmail.com
                            </p>
                      
                            <Link to='/Enroll'>
                              <div className="mt-4 sm:mt-6 inline-block text-blue-400 hover:text-blue-300 transition cursor-pointer text-sm sm:text-base">
                                → Enroll Now
                              </div>
                            </Link>
                      
                          </div>
                      
                        </div>
                      
                      </footer>

        </div>
    );
}

export default Course;