import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import invation from "../assets/Innovative.png";
import approch from "../assets/Approch.png";
import team from "../assets/team.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import about from "../assets/about.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Managing from '../assets/Managing.jpg'
import Anurag from '../assets/anurag.webp'
import CoDirector from '../assets/CoDirector.png'
import ceo from '../assets/shailesh.webp'
function About() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);



  return (

    <div className="bg-slate-50">

      {/* Hero */}
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


      <section className="text-white py-12 sm:py-16 md:py-20 lg:py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(50,0,0,0.6), rgba(0,0,50,0.6)), url(${about})`,
        }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <h1
            data-aos="fade-up"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            About DigiQuestPC
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-sm sm:text-base md:text-lg lg:text-xl mt-6 sm:mt-8 max-w-4xl mx-auto leading-7 sm:leading-8 md:leading-9"
          >
            Empowering Careers Through Innovation, Practical Learning
            and Industry-Focused Training.
          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">

          <div className="text-center ">

            <h2
              data-aos="fade-up"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800"
            >
              Empowering Careers Through Innovation & Excellence
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-6 sm:mt-8 text-gray-600 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 md:leading-9 max-w-5xl mx-auto"
            >
              At DigiQuestPC, we are committed to transforming students
              into skilled professionals by delivering industry-focused
              technical education, practical training, and career-oriented
              mentorship.

              Our mission is to bridge the gap between classroom learning
              and real-world industry requirements through live projects,
              expert guidance, and professional development.

              We believe education should not only teach technology but
              also build confidence, communication skills, teamwork,
              leadership qualities, and problem-solving abilities that
              help students achieve successful careers.
            </p>

          </div>

        </div>

      </section>

      {/* Innovative */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          <div data-aos="fade-right">

            <img
              src={invation}
              alt=""
              className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
            />

          </div>

          <div data-aos="fade-left">

            <span className="text-blue-600 font-semibold uppercase text-xs sm:text-sm">
              🚀 Innovation
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4">
              Innovative Learning Solutions
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-6 md:mt-8 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">

              Innovation is at the heart of everything we do.

              We continuously update our curriculum according to industry
              trends and emerging technologies.

              Students gain practical knowledge through live projects,
              coding exercises, workshops, real-world case studies,
              hackathons, and interactive sessions.

              From admission to placement, our mentors guide every
              student towards career success.

            </p>

          </div>

        </div>

      </section>

      {/* Student First */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-green-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          <div data-aos="fade-right">

            <span className="text-green-700 font-semibold uppercase text-xs sm:text-sm">
              🤝 Student First
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4">
              Student-Centric Approach
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-6 md:mt-8 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">

              Every student has different goals and learning styles.

              We provide personalized mentorship, career counselling,
              one-to-one guidance, interview preparation, personality
              development and continuous learning support.

              Our focus is to make students technically strong while
              improving communication skills, confidence and professional
              ethics.

            </p>

          </div>

          <div data-aos="fade-left">

            <img
              src={approch}
              alt=""
              className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
            />

          </div>

        </div>

      </section>

      {/* Experienced Team */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          <div data-aos="fade-right">

            <img
              src={team}
              alt=""
              className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
            />

          </div>

          <div data-aos="fade-left">

            <span className="text-red-600 font-semibold uppercase text-xs sm:text-sm">
              👨‍💻 Experts
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4">
              Experienced Faculty & Industry Experts
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-6 md:mt-8 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">

              Our trainers have years of professional experience in
              Software Development, Artificial Intelligence,
              Cybersecurity, Networking, Cloud Computing, Data Science,
              Full Stack Development and modern technologies.

              Students learn industry best practices, project management,
              real business workflows and practical implementation
              instead of only theoretical concepts.

            </p>

          </div>

        </div>

      </section>

      {/* ================= Placement Assistance ================= */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              💼 Placement Assistance & Career Development
            </h2>

            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-6 sm:leading-7">
              Our commitment doesn't end after training. We help students become
              industry-ready through complete career guidance and placement support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">

            {[
              "Professional Resume Building",
              "Mock Technical & HR Interviews",
              "Aptitude & Soft Skills Training",
              "Personality Development",
              "Communication Skill Enhancement",
              "Career Counseling Sessions",
              "Internship Opportunities",
              "Job Placement Support"
            ].map((item, index) => (

              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 hover:-translate-y-3 hover:shadow-2xl duration-500 border border-gray-700"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✅</div>

                <h3 className="font-semibold text-base sm:text-lg">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= Why Choose ================= */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <span
              data-aos="fade-up"
              className="inline-block px-3 sm:px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm"
            >
              Why Choose Us
            </span>

            <h2
              data-aos="fade-up"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 sm:mt-5 text-gray-900"
            >
              Why Students Choose
              <span className="text-blue-600"> DigiQuestPC</span>
            </h2>

            <p
              data-aos="fade-up"
              className="mt-4 sm:mt-5 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-6 sm:leading-7"
            >
              Learn practical skills, build real-world projects, and get career
              support from experienced mentors.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">

            {[
              {
                icon: "💻",
                title: "Practical Training",
                desc: "Hands-on learning with real software and tools."
              },
              {
                icon: "🚀",
                title: "Live Projects",
                desc: "Work on industry-level projects to gain experience."
              },
              {
                icon: "👨‍🏫",
                title: "Expert Mentors",
                desc: "Learn directly from experienced IT professionals."
              },
              {
                icon: "🏆",
                title: "Certification",
                desc: "Earn recognized certificates after course completion."
              },
              {
                icon: "💼",
                title: "Placement Support",
                desc: "Resume building, interview preparation & job assistance."
              },
              {
                icon: "🎯",
                title: "Career Guidance",
                desc: "Personal mentoring to help you choose the right career path."
              },
            ].map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-4xl sm:text-5xl mb-5 sm:mb-6 group-hover:rotate-6 duration-300">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= Vision Mission ================= */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

          <div
            data-aos="fade-right"
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-700"
          >

            <div className="text-5xl sm:text-6xl mb-4 sm:mb-5">
              🎯
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Our Vision
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-5 md:mt-6 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">
              To become India's most trusted technology training institute by
              delivering world-class education, fostering innovation and helping
              students build successful careers in the IT industry.
            </p>

          </div>

          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-700"
          >

            <div className="text-5xl sm:text-6xl mb-4 sm:mb-5">
              🚀
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Our Mission
            </h2>

            <p className="text-gray-600 mt-4 sm:mt-5 md:mt-6 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base">
              To provide affordable, practical and industry-focused education that
              develops technical excellence, confidence and professional skills for
              global career opportunities.
            </p>

          </div>

        </div>

      </section>



      {/* company runner */}

      <div className="w-full px-4 sm:px-6 lg:px-12 py-10 flex justify-center">

        <div className="w-full max-w-6xl">

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">

            {/* Card 1 */}
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={Managing}
                  alt="profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                Dr. Atul Kumar Singh
              </h3>

              <p className="text-indigo-600 text-sm font-medium">
                Managing Director
              </p>

              <p className="text-xs text-red-900 mt-1">
                <strong>BHMS, MD, PG London, FRCH London</strong>
              </p>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                🟠 With over 13 years of experience in healthcare and wellness, Dr. Atul Kumar Singh is a Homeopathy Doctor and Wellness Practitioner dedicated to promoting holistic well-being. <br></br><br></br>
                🟠 He believes that good health comes from maintaining balance between the body, mind, and spirit. Through Niramaya Yoga, he works to make authentic yoga education accessible to everyone.<br></br><br></br>
                🟠 By combining traditional yogic principles with modern wellness practices, he helps individuals build healthier habits, improve mindfulness, and enhance their overall quality of life.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={Anurag}
                  alt="profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Anurag Yadav
              </h3>

              <p className="text-indigo-600 text-sm font-medium">
                Founder
              </p>


            <p className="text-xs text-red-900 mt-1">
                <strong> B.Tech (ABES Ghaziabad), MBA (IIM Indore)</strong>
              </p>
              

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
               🟠 With a strong academic foundation, including a B.Tech from ABES Engineering College, Ghaziabad, and an MBA from IIM Indore, Anurag Yadav combines technical expertise with strategic leadership to build impactful learning experiences for students.<br></br><br></br>

🟠 As the Founder of DigiQuest, he is committed to bridging the gap between academic education and industry requirements by promoting practical, skill-based learning, career mentorship, and hands-on training programs.<br></br><br></br>

🟠 He believes that every student deserves the right guidance, real-world exposure, and continuous mentorship to achieve professional success, empowering learners to become confident, job-ready, and future-ready professionals.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={CoDirector}
                  alt="profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Rajnandani
              </h3>

              <p className="text-indigo-600 text-sm font-medium">
                Co-Director
              </p>

               <p className="text-xs text-red-900 mt-1">
                <strong> BA ,MA</strong>
              </p>

              

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
               🟠 With academic qualifications in BA and MA, Rajnandani brings strong communication, organizational, and leadership skills, contributing to the overall growth and vision of DigiQuest.<br></br><br></br>

🟠 As the Co-Director of DigiQuest, she is committed to creating a supportive learning environment, ensuring quality education, student development, and effective academic management for long-term success.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img
                  src={ceo}
                  alt="profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Shailesh Kumar Yadav
              </h3>

              <p className="text-indigo-600 text-sm font-medium">
                CEO
              </p>

               <p className="text-xs text-red-900 mt-1">
                <strong> B.Sc, M.Sc, BCA, MBA</strong>
              </p>

            

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
             🟠 With a diverse academic background including B.Sc, M.Sc, BCA, and MBA, Shailesh Kumar Yadav brings a unique combination of scientific knowledge, technical expertise, and business leadership to drive innovation and organizational growth.<br></br> <br></br>
🟠 As the CEO of DigiQuest, he is dedicated to fostering excellence in education by empowering students with industry-relevant skills, strategic career guidance, and a strong focus on professional development and lifelong learning.
              </p>
            </div>

          </div>

        </div>
      </div>
      {/* ================= Contact ================= */}

      <section className="py-12 sm:py-16 md:py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">

            <h2
              data-aos="fade-up"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              📍 Get In Touch
            </h2>

            <p
              data-aos="fade-up"
              className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base"
            >
              Visit our nearest office or contact us for admissions and placements.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">

            <div
              data-aos="fade-up"
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-t-4 border-blue-600 hover:-translate-y-3 duration-500 border border-gray-700"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
                Registered Branch
              </h3>

              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📞 +91 9236185711</p>
              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📧 info@dcs.org.in</p>

              <p className="text-gray-600 text-sm sm:text-base">
                41K Kalepur, Behind Shekhar Hospital,
                Paidleganj, Gorakhpur - 273001
              </p>

            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-t-4 border-green-600 hover:-translate-y-3 duration-500 border border-gray-700"
            >

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
                Corporate Branch
              </h3>

              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📞 +91 9236398112</p>
              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📧 tech.in.dcs@gmail.com</p>

              <p className="text-gray-600 text-sm sm:text-base">
                Near DIG Bunglow, Bilandpur,
                Gorakhpur - 273001
              </p>

            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-t-4 border-red-600 hover:-translate-y-3 duration-500 border border-gray-700"
            >

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">
                Training & Placement
              </h3>

              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📞 +91 9236398112</p>
              <p className="mb-2 sm:mb-3 text-sm sm:text-base">📧 tech.in.dcs@gmail.com</p>

              <p className="text-gray-600 text-sm sm:text-base">
                B-38 GIDA Sector-5,
                Gorakhpur - 273209
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Call To Action ================= */}

      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(50,0,0,0.6), rgba(0,0,50,0.6)), url(${about})`,
        }} >


        {/* Background Blur Effects */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div
          data-aos="zoom-in"
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-8 sm:p-10 md:p-12 shadow-2xl text-center">


            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 sm:mt-5 md:mt-6 leading-tight">
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
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8 sm:mt-10 md:mt-12">

              {/* <Link to="/Enroll">
                <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-white text-blue-700 font-bold text-sm sm:text-base md:text-lg shadow-lg hover:bg-cyan-300 hover:text-slate-900 hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  Enroll Now →
                </button>
              </Link> */}

              <Link to="/Course">
                <button className="px-8 sm:px-10 py-3 sm:py-4 rounded-xl border-2 border-white font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto">
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

export default About;