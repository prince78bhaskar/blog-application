import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import coursebanner from '../assets/coursebg.jpg'
function Course() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const [selectedCourse, setSelectedCourse] = useState(null);
    return (
        <div className="bg-gray-50">

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

            {/* Hero Section */}
            <section>
                <div
                    className="text-white py-24 bg-cover bg-center    "
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,100,0.6), rgba(0,0,100,0.6)), url(${coursebanner})`,
                    }}
                >
                    <div className="max-w-7xl mx-auto px-6 text-center text-white">

                        <h1
                            data-aos="fade-up"
                            className="text-5xl md:text-6xl font-bold"
                        >
                            Our Courses
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="mt-8 text-lg md:text-xl max-w-4xl mx-auto leading-9 text-gray-200"
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

            <section className="py-20 bg-gray-50">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Popular Courses
                        </h2>

                        <p className="mt-5 text-gray-600">
                            Choose the right course and start your career journey.
                        </p>

                    </div>

                    <div
                        data-aos="fade-up"
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14"
                    >

                        {/* Full Stack */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">💻</div>

                            <h3 className="text-xl font-bold mt-5">
                                Full Stack Development
                            </h3>

                            <p className="mt-4 text-gray-600">
                                HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.
                            </p>
                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 6 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Full Stack Development",
                                            icon: "💻",
                                            duration: "6 Months",
                                            level: "Beginner",
                                            description:
                                                "Learn HTML, CSS, JavaScript, React, Node.js, Express.js and MongoDB with Live Projects, Git, GitHub and Placement Preparation."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-xl py-2 hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>


                            </div>

                        </div>

                        {/* Python */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">🐍</div>

                            <h3 className="text-xl font-bold mt-5">
                                Python Programming
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn Python from basics to advanced with practical projects.
                            </p>
                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 4 Months</span>
                                <span>📘 Beginner</span>
                            </div>
                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Python Programming",
                                            icon: "🐍",
                                            duration: "4 Months",
                                            level: "Beginner",
                                            description:
                                                "Master Python, OOP, Django, APIs and real-world projects with placement support."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-xl py-2 hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>



                            </div>

                        </div>

                        {/* Data Analytics */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">📊</div>

                            <h3 className="text-xl font-bold mt-5">
                                Data Analytics
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Excel, SQL, Power BI and data visualization techniques.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 5 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Data Analytics",
                                            icon: "📊",
                                            duration: "5 Months",
                                            level: "Intermediate",
                                            description:
                                                "Learn Excel, SQL, Power BI, Dashboard Creation and Data Visualization."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-xl py-2 hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>



                            </div>

                        </div>

                        {/* Cloud */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">☁️</div>

                            <h3 className="text-xl font-bold mt-5">
                                Cloud Computing
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn cloud concepts, deployment and cloud services.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 4 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            title: "Cloud Computing",
                                            icon: "☁️",
                                            duration: "4 Months",
                                            level: "Beginner",
                                            description:
                                                "Learn AWS, EC2, S3, IAM, Cloud Deployment and Security."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 rounded-xl py-2 hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
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

                        <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative">

                            <button
                                onClick={() => setSelectedCourse(null)}
                                className="absolute top-4 right-5 text-3xl"
                            >
                                &times;
                            </button>

                            <div className="text-6xl">{selectedCourse.icon}</div>

                            <h2 className="text-3xl font-bold mt-4">
                                {selectedCourse.title}
                            </h2>

                            <p className="mt-5">
                                <strong>Duration:</strong> {selectedCourse.duration}
                            </p>

                            <p className="mt-2">
                                <strong>Level:</strong> {selectedCourse.level}
                            </p>

                            <p className="mt-6 text-gray-600 leading-8">
                                {selectedCourse.description}
                            </p>

                            <div className="flex gap-4 mt-8">


                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>



                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="flex-1 border rounded-xl py-3 hover:bg-gray-100"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </section>

            {/* More Courses */}

            <section className="pb-20 bg-gray-50">

                <div data-aos="fade-up" className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Java */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">☕</div>

                            <h3 className="text-2xl font-bold mt-5">
                                Java Programming
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                Learn Core Java, OOP concepts and build desktop &
                                web applications with real projects.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 4 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "☕",
                                            title: "Java Programming",
                                            duration: "4 Months",
                                            level: "Beginner",
                                            description:
                                                "Learn Core Java, Advanced Java, OOP, JDBC, Collections, Multithreading and build real-world desktop and web applications."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition "
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>

                            </div>

                        </div>

                        {/* C & C++ */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">💻</div>

                            <h3 className="text-2xl font-bold mt-5">
                                C & C++
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                Build a strong programming foundation with C and
                                C++ programming.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 3 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "💻",
                                            title: "C & C++",
                                            duration: "3 Months",
                                            level: "Beginner",
                                            description:
                                                "Master C & C++, Data Structures, Algorithms and Object-Oriented Programming with practical coding."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>
                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>


                            </div>

                        </div>

                        {/* Networking */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">🌐</div>

                            <h3 className="text-2xl font-bold mt-5">
                                Networking
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                Learn networking concepts, routing, switching,
                                Cisco and network security.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 5 Months</span>
                                <span>📘 Intermediate</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "🌐",
                                            title: "Networking",
                                            duration: "5 Months",
                                            level: "Intermediate",
                                            description:
                                                "Learn CCNA basics, Routing, Switching, Firewalls, LAN, WAN and Network Security."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>

                            </div>

                        </div>

                        {/* Digital Marketing */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

                            <div className="text-5xl">📱</div>

                            <h3 className="text-2xl font-bold mt-5">
                                Digital Marketing
                            </h3>

                            <p className="mt-4 text-gray-600 leading-7">
                                Master SEO, Social Media Marketing, Google Ads
                                and Branding.
                            </p>

                            <div className="flex justify-between text-sm text-gray-500 mt-6">
                                <span>⏳ 3 Months</span>
                                <span>📘 Beginner</span>
                            </div>

                            <div className="flex gap-3 mt-8">

                                <button
                                    onClick={() =>
                                        setSelectedCourse({
                                            icon: "📱",
                                            title: "Digital Marketing",
                                            duration: "3 Months",
                                            level: "Beginner",
                                            description:
                                                "Learn SEO, Google Ads, Facebook Ads, Instagram Marketing, Content Marketing and Branding."
                                        })
                                    }
                                    className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition"
                                >
                                    View
                                </button>

                                <Link to='/Enroll' className="flex-1 ">
                                    <li className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition text-center">
                                        Enroll
                                    </li>
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
            


            {/* Why Learn With Us */}

         <section className="relative overflow-hidden bg-white py-24">
            {/* bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 */}

  {/* Background Blur */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Heading */}
    <div className="text-center mb-16" data-aos="fade-down">
      <span className="inline-block px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-black font-semibold">
        WHY CHOOSE US
      </span>

      <h2 className="text-5xl font-bold text-black mt-5">
        Why Learn With
        <span className="text-blue-400"> DigiQuestPC?</span>
      </h2>

      <p className="mt-6 text-gray-900 max-w-2xl mx-auto leading-8">
        Gain practical skills, build real-world projects, and get career
        guidance from experienced mentors to become industry-ready.
      </p>
    </div>

    {/* Cards */}
    <div
      data-aos="zoom-in-up"
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
    >

      {/* Card 1 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          👨‍🏫
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Expert Trainers
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Learn from experienced professionals with real industry knowledge
          and mentorship.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          💻
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Practical Learning
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Build live projects, assignments and gain real-world coding
          experience.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          📜
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Certification
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Receive an industry-recognized certificate after completing your
          course successfully.
        </p>
      </div>

      {/* Card 4 */}
      <div className="group bg-white backdrop-blur-lg border border-gray-300 rounded-3xl p-8 text-center hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] duration-500">

        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-4xl group-hover:rotate-12 group-hover:scale-110 duration-500">
          💼
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Placement Support
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Resume building, interview preparation, career guidance and placement
          assistance.
        </p>
      </div>

    </div>

  </div>

</section>

            {/* Course Features */}

       <section className="relative overflow-hidden  py-24">

  {/* Background Blur */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Heading */}
    <div className="text-center mb-16" data-aos="fade-down">
      <span className="inline-block px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400 text-black font-semibold">
        OUR FEATURES
      </span>

      <h2 className="text-5xl font-bold text-black   mt-5">
        Course <span className="text-blue-400">Features</span>
      </h2>

      <p className="text-gray-900 mt-5 max-w-2xl mx-auto leading-8">
        Learn with practical training, expert guidance and career support
        designed to make you industry-ready.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          📚
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Live Classes
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Interactive live sessions with expert trainers and real practical
          demonstrations.
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(34,197,94,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          💻
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Hands-on Projects
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Build live projects that enhance your portfolio and practical
          experience.
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(249,115,22,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          🎓
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Certification
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Earn an industry-recognized certificate after completing your
          training.
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          📖
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Study Material
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Get complete notes, PDFs, assignments and practice exercises for
          every module.
        </p>
      </div>

      {/* Card 5 */}
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(236,72,153,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          🤝
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Doubt Support
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          One-to-one doubt sessions and mentor support whenever you need help.
        </p>
      </div>

      {/* Card 6 */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="group bg-white  border border-black rounded-3xl p-8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.35)] duration-500"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 duration-500">
          💼
        </div>

        <h3 className="text-2xl font-bold text-black mt-6">
          Placement Assistance
        </h3>

        <p className="text-gray-900 mt-4 leading-7">
          Resume preparation, interview practice and dedicated placement
          support.
        </p>
      </div>

    </div>

  </div>
</section>

            {/* Learning Process */}

        <section className="bg-white py-24 overflow-hidden">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-16" data-aos="fade-down">
      <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
        HOW IT WORKS
      </span>

      <h2 className="text-5xl font-bold text-gray-900 mt-5">
        Learning <span className="text-blue-600">Process</span>
      </h2>

      <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8">
        Follow our simple step-by-step learning process and become
        industry-ready with practical knowledge and placement support.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Line */}
      <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"></div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 relative">

        {/* Step 1 */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 duration-500">
            1
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Enroll
          </h3>

          <p className="text-gray-600 mt-3">
            Register for your preferred course and begin your journey.
          </p>
        </div>

        {/* Step 2 */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 duration-500">
            2
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Learn
          </h3>

          <p className="text-gray-600 mt-3">
            Attend live classes with expert trainers and mentors.
          </p>
        </div>

        {/* Step 3 */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 duration-500">
            3
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Practice
          </h3>

          <p className="text-gray-600 mt-3">
            Build real-world projects and strengthen your skills.
          </p>
        </div>

        {/* Step 4 */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 duration-500">
            4
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Get Certified
          </h3>

          <p className="text-gray-600 mt-3">
            Receive an industry-recognized certification after completion.
          </p>
        </div>

        {/* Step 5 */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 duration-500 p-8 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 duration-500">
            5
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-800">
            Get Placed
          </h3>

          <p className="text-gray-600 mt-3">
            Get placement assistance, mock interviews and career guidance.
          </p>
        </div>

      </div>
    </div>

  </div>

</section>

            {/* Call To Action */}

           <section className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white">

  {/* Background Blur Effects */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

  <div
    data-aos="zoom-in"
    className="relative z-10 max-w-5xl mx-auto px-6"
  >
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[35px] p-12 shadow-2xl text-center">

      <span className="inline-block px-5 py-2 rounded-full bg-white/20 text-blue-100 font-semibold">
        🚀 Join DigiQuestPC
      </span>

      <h2 className="text-5xl font-extrabold mt-6 leading-tight">
        Start Your Learning
        <span className="block text-cyan-300">
          Journey Today
        </span>
      </h2>

      <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto leading-8">
        Learn from industry experts, build real-world projects,
        earn certification, and get dedicated placement support
        to launch your career.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        <div>
          <h3 className="text-3xl font-bold text-cyan-300">
            500+
          </h3>
          <p className="text-blue-100 mt-2">
            Students
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-cyan-300">
            20+
          </h3>
          <p className="text-blue-100 mt-2">
            Courses
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-cyan-300">
            100%
          </h3>
          <p className="text-blue-100 mt-2">
            Support
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

        <Link to="/Enroll">
          <button className="px-10 py-4 rounded-xl bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-cyan-300 hover:text-slate-900 hover:scale-105 transition-all duration-300">
            Enroll Now →
          </button>
        </Link>

        <Link to="/Course">
          <button className="px-10 py-4 rounded-xl border-2 border-white font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300">
            Explore Courses
          </button>
        </Link>

      </div>

    </div>
  </div>

</section>

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

export default Course;