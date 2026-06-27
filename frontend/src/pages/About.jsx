import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import invation from "../assets/Innovative.png";
import approch from "../assets/approch.png";
import team from "../assets/team.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function About() {

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

            <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
              Courses
            </li>

            <Link to='/Enroll'>
              <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                Enroll
              </li>
            </Link>

          </ul>

        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 via-black-500 to-blue-400 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1
            data-aos="fade-up"
            className="text-5xl md:text-6xl font-bold"
          >
            About DigiQuestPC
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl mt-8 max-w-4xl mx-auto leading-9"
          >
            Empowering Careers Through Innovation, Practical Learning
            and Industry-Focused Training.
          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="py-5">

        <div className="max-w-7xl mx-auto ">

          <div className="text-center ">

            <h2
              data-aos="fade-up"
              className="text-4xl font-bold text-gray-800"
            >
              Empowering Careers Through Innovation & Excellence
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-8 text-gray-600 text-lg leading-9 max-w-5xl mx-auto"
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

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div data-aos="fade-right">

            <img
              src={invation}
              alt=""
              className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
            />

          </div>

          <div data-aos="fade-left">

            <span className="text-blue-600 font-semibold uppercase">
              🚀 Innovation
            </span>

            <h2 className="text-4xl font-bold mt-4">
              Innovative Learning Solutions
            </h2>

            <p className="text-gray-600 mt-8 leading-8">

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

      <section className="py-20 bg-green-50">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div data-aos="fade-right">

            <span className="text-green-700 font-semibold uppercase">
              🤝 Student First
            </span>

            <h2 className="text-4xl font-bold mt-4">
              Student-Centric Approach
            </h2>

            <p className="text-gray-600 mt-8 leading-8">

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

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <div data-aos="fade-right">

            <img
              src={team}
              alt=""
              className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
            />

          </div>

          <div data-aos="fade-left">

            <span className="text-red-600 font-semibold uppercase">
              👨‍💻 Experts
            </span>

            <h2 className="text-4xl font-bold mt-4">
              Experienced Faculty & Industry Experts
            </h2>

            <p className="text-gray-600 mt-8 leading-8">

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

      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-800">
              💼 Placement Assistance & Career Development
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment doesn't end after training. We help students become
              industry-ready through complete career guidance and placement support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

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
                className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-3 hover:shadow-2xl duration-500"
              >
                <div className="text-4xl mb-4">✅</div>

                <h3 className="font-semibold text-lg">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= Why Choose ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2
              data-aos="fade-up"
              className="text-4xl font-bold"
            >
              🌟 Why Students Choose DigiQuestPC
            </h2>

            <p
              data-aos="fade-up"
              className="mt-5 text-gray-600"
            >
              Thousands of students trust us to build successful careers.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">

            {[
              "Industry-Oriented Practical Training",
              "Live Projects & Assignments",
              "Experienced Industry Mentors",
              "Modern Computer Labs",
              "Small Batch Size",
              "Global Certifications",
              "Placement Assistance",
              "Scholarship Programs",
              "Professional Environment",
              "Career Guidance"
            ].map((item, index) => (

              <div
                key={index}
                data-aos="flip-left"
                data-aos-delay={index * 50}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl hover:scale-105 duration-500"
              >
                <div className="text-4xl mb-4">⭐</div>

                <h3 className="font-semibold">
                  {item}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= Vision Mission ================= */}

      <section className="py-20 bg-slate-100">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

          <div
            data-aos="fade-right"
            className="bg-white rounded-3xl shadow-xl p-10"
          >

            <div className="text-5xl mb-5">
              🎯
            </div>

            <h2 className="text-3xl font-bold">
              Our Vision
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              To become India's most trusted technology training institute by
              delivering world-class education, fostering innovation and helping
              students build successful careers in the IT industry.
            </p>

          </div>

          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl shadow-xl p-10"
          >

            <div className="text-5xl mb-5">
              🚀
            </div>

            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              To provide affordable, practical and industry-focused education that
              develops technical excellence, confidence and professional skills for
              global career opportunities.
            </p>

          </div>

        </div>

      </section>

      {/* ================= Contact ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2
              data-aos="fade-up"
              className="text-4xl font-bold"
            >
              📍 Get In Touch
            </h2>

            <p
              data-aos="fade-up"
              className="text-gray-600 mt-4"
            >
              Visit our nearest office or contact us for admissions and placements.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            <div
              data-aos="fade-up"
              className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-blue-600 hover:-translate-y-3 duration-500"
            >
              <h3 className="text-2xl font-bold mb-5">
                Registered Branch
              </h3>

              <p className="mb-3">📞 +91 9236185711</p>
              <p className="mb-3">📧 info@dcs.org.in</p>

              <p className="text-gray-600">
                41K Kalepur, Behind Shekhar Hospital,
                Paidleganj, Gorakhpur - 273001
              </p>

            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-green-600 hover:-translate-y-3 duration-500"
            >

              <h3 className="text-2xl font-bold mb-5">
                Corporate Branch
              </h3>

              <p className="mb-3">📞 +91 9236398112</p>
              <p className="mb-3">📧 tech.in.dcs@gmail.com</p>

              <p className="text-gray-600">
                Near DIG Bunglow, Bilandpur,
                Gorakhpur - 273001
              </p>

            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-red-600 hover:-translate-y-3 duration-500"
            >

              <h3 className="text-2xl font-bold mb-5">
                Training & Placement
              </h3>

              <p className="mb-3">📞 +91 9236398112</p>
              <p className="mb-3">📧 tech.in.dcs@gmail.com</p>

              <p className="text-gray-600">
                B-38 GIDA Sector-5,
                Gorakhpur - 273209
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Achievement Section ================= */}

      <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16" data-aos="fade-up">

            <h2 className="text-5xl font-bold">
              Our Commitment to Excellence
            </h2>

            <p className="mt-5 text-blue-100 text-lg">
              Helping students build successful careers through quality education,
              innovation and industry-focused training.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center hover:scale-105 duration-500">
              <div className="text-5xl">👨‍🎓</div>
              <h1 className="text-5xl font-bold mt-5">1000+</h1>
              <p className="mt-3 text-blue-100">Students Trained</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center hover:scale-105 duration-500">
              <div className="text-5xl">🏢</div>
              <h1 className="text-5xl font-bold mt-5">200+</h1>
              <p className="mt-3 text-blue-100">Hiring Partners</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center hover:scale-105 duration-500">
              <div className="text-5xl">💼</div>
              <h1 className="text-5xl font-bold mt-5">95%</h1>
              <p className="mt-3 text-blue-100">Placement Rate</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center hover:scale-105 duration-500">
              <div className="text-5xl">💰</div>
              <h1 className="text-5xl font-bold mt-5">₹5LPA+</h1>
              <p className="mt-3 text-blue-100">Average Package</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= Call To Action ================= */}

      <section className="py-24 bg-white">

        <div
          data-aos="zoom-in"
          className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white text-center px-10 py-20 shadow-2xl"
        >

          <h2 className="text-5xl font-bold">
            Start Your Tech Career Today
          </h2>

          <p className="mt-8 text-xl leading-8 text-blue-100">
            Join DigiQuestPC and learn from experienced mentors,
            work on live projects, earn industry-recognized certifications,
            and get dedicated placement assistance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">

            <Link to='/Course'>
              <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:scale-105 duration-300">
                Explore Courses
              </button>
            </Link>
            <button className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 duration-300">
              Contact Us
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;