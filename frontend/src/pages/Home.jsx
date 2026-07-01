import React from "react";
import logo from '../assets/logo.png'
import tp from '../assets/tp.png'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
      <header className="sticky top-0 z-50 bg-gray-100 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-40 cursor-pointer hover:scale-105 transition duration-300"
          />

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-semibold">

            <Link to='/'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                Home
              </li></Link>

            <Link to='/About'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                About Us
              </li>
            </Link>

            <Link to='/placement'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                Placement
              </li>
            </Link>

            <Link to='/Course'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                Courses
              </li>
            </Link>
     <Link to='/Enroll'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                Enroll
              </li>
            </Link>

          </ul>

        </div>
      </header>

      <main>
        {/* Introduction */}
        <section
          id="home"
          className="bg-gradient-to-r from-blue-50 to-white py-20"
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div data-aos="fade-right">

              <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
                🎓 PROFESSIONAL TRAINING IN PROGRESS
              </span>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mt-6 leading-tight">
                Advanced Tech
                <span className="text-blue-600"> Training Programs</span>
              </h1>
              <h3 className="text-2xl text-gray-700 mt-6 font-medium leading-relaxed">
                Master In-Demand Tech Skills with
                <br />
                Expert Guidance & Mentorship
              </h3>

              <p className="text-gray-600 mt-6 text-lg leading-8">
                We provide industry-focused training and dedicated placement
                assistance to help students build in-demand skills, gain practical
                experience, and achieve successful careers with top companies.
              </p>

              <div className="flex gap-5 mt-10">

                <Link to='/Course'>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300">
                    Explore Courses
                  </button>
                </Link>

                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                  Contact Us
                </button>

              </div>

            </div>

            {/* Right Image */}
            {/* <div
              data-aos="fade-left"
              className="flex justify-center"
            >
              <img
                src={tp}
                alt="Training"
                className="w-full max-w-lg hover:scale-105 transition duration-500 drop-shadow-2xl"
              />
            </div> */}
            <div
  data-aos="fade-left"
  className="flex justify-center items-center w-full"
>
  <img
    src={tp}
    alt="Training"
    className="w-full max-w-2xl h-auto object-contain hover:scale-105 transition duration-500"
  />
</div>

          </div>
        </section>

        {/* Why us */}
        <section id="why-us" className="bg-slate-50 py-20">

          <div className="max-w-7xl mx-auto px-6">

            {/* Heading */}
            <div
              data-aos="fade-up"
              className="text-center mb-16"
            >
              <span className="text-blue-600 font-semibold uppercase tracking-wider">
                Why Choose Us
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                Why Choose Us for Your Training?
              </h2>

              <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
                Build your future with industry-focused training, expert mentorship,
                globally recognized certifications, and dedicated placement support.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div
                data-aos="zoom-in"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-700"
              >
                <div className="text-5xl">🚀</div>
                <h3 className="text-xl font-bold mt-5">
                  Modern Learning Environment
                </h3>
                <p className="text-gray-600 mt-4">
                  Learn in fully equipped labs with the latest hardware, software,
                  and industry-standard tools.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="100"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">👨‍🏫</div>
                <h3 className="text-xl font-bold mt-5">
                  Industry Expert Trainers
                </h3>
                <p className="text-gray-600 mt-4">
                  Learn from professionals with 8+ years of real-world experience and
                  practical industry knowledge.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="200"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">💼</div>
                <h3 className="text-xl font-bold mt-5">
                  Career & Placement Support
                </h3>
                <p className="text-gray-600 mt-4">
                  Resume building, mock interviews, aptitude training and placement
                  assistance to make you job-ready.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="300"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">🎓</div>
                <h3 className="text-xl font-bold mt-5">
                  Global Certifications
                </h3>
                <p className="text-gray-600 mt-4">
                  Prepare for AWS, Microsoft, Google Cloud, Cisco, Red Hat and other
                  leading certifications.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="400"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">🏢</div>
                <h3 className="text-xl font-bold mt-5">
                  Corporate Learning Experience
                </h3>
                <p className="text-gray-600 mt-4">
                  Experience an MNC-like work culture with teamwork,
                  communication and professionalism.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="500"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">🤝</div>
                <h3 className="text-xl font-bold mt-5">
                  Personal Mentorship
                </h3>
                <p className="text-gray-600 mt-4">
                  One-on-one mentoring sessions with personalized guidance throughout
                  your learning journey.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="600"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">💰</div>
                <h3 className="text-xl font-bold mt-5">
                  Scholarships
                </h3>
                <p className="text-gray-600 mt-4">
                  Up to 50% scholarships for deserving students to make quality
                  education affordable.
                </p>
              </div>

              <div
                data-aos="zoom-in"
                data-aos-delay="700"
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500  border border-gray-700"
              >
                <div className="text-5xl">🌍</div>
                <h3 className="text-xl font-bold mt-5">
                  Global Career Opportunities
                </h3>
                <p className="text-gray-600 mt-4">
                  Get expert guidance for national and international career
                  opportunities.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ===================== Commitment  Section ===================== */}
        <section className="py-24 bg-slate-950 text-white overflow-hidden relative">

  {/* Background Blur */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 blur-[120px] rounded-full"></div>

  <div className="relative max-w-7xl mx-auto px-6">

    <div
      data-aos="fade-up"
      className="text-center mb-20"
    >
      <span className="px-5 py-2 bg-blue-500/20 rounded-full text-blue-300 font-semibold">
        WHY CHOOSE US
      </span>

      <h2 className="text-5xl font-bold mt-6">
        Our Commitment
      </h2>

      <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-lg">
        We believe in practical education, industry exposure and
        guaranteed career growth through quality training.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div
        data-aos="zoom-in"
        className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-blue-500 hover:-translate-y-4 duration-500"
      >

        <div className="text-6xl group-hover:scale-125 duration-500">
          👨‍🎓
        </div>

        <h2 className="text-5xl font-bold mt-6 text-blue-400">
          1000+
        </h2>

        <p className="mt-4 text-gray-300">
          Students Successfully Trained
        </p>

      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay="150"
        className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-green-500 hover:-translate-y-4 duration-500"
      >

        <div className="text-6xl group-hover:rotate-12 duration-500">
          🎯
        </div>

        <h2 className="text-5xl font-bold mt-6 text-green-400">
          95%
        </h2>

        <p className="mt-4 text-gray-300">
          Placement Success Rate
        </p>

      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-yellow-500 hover:-translate-y-4 duration-500"
      >

        <div className="text-6xl group-hover:scale-125 duration-500">
          🏢
        </div>

        <h2 className="text-5xl font-bold mt-6 text-yellow-400">
          200+
        </h2>

        <p className="mt-4 text-gray-300">
          Hiring Partner Companies
        </p>

      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay="450"
        className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-pink-500 hover:-translate-y-4 duration-500"
      >

        <div className="text-6xl group-hover:scale-125 duration-500">
          💰
        </div>

        <h2 className="text-5xl font-bold mt-6 text-pink-400">
          ₹5LPA+
        </h2>

        <p className="mt-4 text-gray-300">
          Average Package
        </p>

      </div>

    </div>

  </div>

</section>

      

        {/* ===================== Features Section ===================== */}

        <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-100">

  <div className="max-w-7xl mx-auto px-6">

    <div
      data-aos="fade-up"
      className="text-center mb-20"
    >

      <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
        OUR CAMPUS
      </span>

      <h2 className="text-5xl font-bold mt-6 text-gray-900">
        World-Class Learning Environment
      </h2>

      <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
        Learn with modern infrastructure, advanced computer labs,
        smart classrooms and high-speed internet.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-10">

      <div
        data-aos="fade-up"
        className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-blue-400/40 hover:-translate-y-5 duration-500 border border-gray-700"
      >

        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl mx-auto group-hover:rotate-12 duration-500">
          💻
        </div>

        <h3 className="text-3xl font-bold text-center mt-8">
          High-Speed Internet
        </h3>

        <p className="text-gray-600 mt-5 text-center">
          Dedicated 1Gbps Fiber Internet for seamless coding,
          live classes and project work.
        </p>

      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-green-400/40 hover:-translate-y-5 duration-500 border border-gray-700"
      >

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mx-auto group-hover:scale-110 duration-500">
          🖥️
        </div>

        <h3 className="text-3xl font-bold text-center mt-8">
          Modern Computer Labs
        </h3>

        <p className="text-gray-600 mt-5 text-center">
          Latest Core i5/i7 systems with SSD and 16GB RAM for
          industry-level practical training.
        </p>

      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-pink-400/40 hover:-translate-y-5 duration-500 border border-gray-700"
      >

        <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-5xl mx-auto group-hover:animate-bounce">
          🎧
        </div>

        <h3 className="text-3xl font-bold text-center mt-8">
          Smart Classrooms
        </h3>

        <p className="text-gray-600 mt-5 text-center">
          Interactive projector-based classrooms with premium
          audio and video facilities.
        </p>

      </div>

    </div>

  </div>

</section>  

      </main>

      

     <footer className="bg-slate-900 text-white mt-24">

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 px-6">

    {/* ================= COLUMN 1 ================= */}
    <div data-aos="fade-up">
      <h2 className="text-3xl font-bold">
        DigiQuestPC
      </h2>

      <p className="mt-5 text-gray-300 leading-8">
        Upskill with practical training, mentorship and placement support.
      </p>

      <p className="mt-8 text-gray-400">
        © 2026 DigiQuestPC. All Rights Reserved.
      </p>
    </div>

    {/* ================= QUICK LINKS ================= */}
    <div data-aos="fade-up" data-aos-delay="200">

      <h2 className="text-2xl font-bold mb-6">
        Quick Links
      </h2>

      <ul className="space-y-4 text-gray-300">

        <li className="hover:text-blue-400 cursor-pointer">Home</li>
        <li className="hover:text-blue-400 cursor-pointer">About Us</li>
        <li className="hover:text-blue-400 cursor-pointer">Placement</li>
        <li className="hover:text-blue-400 cursor-pointer">Contact</li>

      </ul>

    </div>

    {/* ================= COURSES ================= */}
    <div data-aos="fade-up" data-aos-delay="300">

      <h2 className="text-2xl font-bold mb-6">
        Courses
      </h2>

      <ul className="space-y-4 text-gray-300">

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

      <h2 className="text-2xl font-bold">
        Contact
      </h2>

      <p className="mt-6 text-gray-300">
        📞 +91 92363 98129
      </p>

      <p className="mt-4 text-gray-300">
        📧 digiquestpc@gmail.com
      </p>

      <Link to='/Enroll'>
        <div className="mt-6 inline-block text-blue-400 hover:text-blue-300 transition cursor-pointer">
          → Enroll Now
        </div>
      </Link>

    </div>

  </div>

</footer>
    </div>
  );
}
export default Home;