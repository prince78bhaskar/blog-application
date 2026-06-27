import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Course() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
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

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-10">

                    <div>

                        <h1 className="text-5xl font-bold leading-tight">
                            Our Courses
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Learn the latest technologies through practical training,
                            live projects and expert guidance. Build the skills that
                            companies are looking for.
                        </p>

                    </div>

                    <div className="flex justify-center">

                        {/* <img
              src={course}
              alt="Course"
              className="w-full max-w-md"
            /> */}

                    </div>

                </div>

            </section>

            {/* Courses */}

            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Popular Courses
                        </h2>

                        <p className="mt-5 text-gray-600">
                            Choose the right course and start your career journey.
                        </p>

                    </div>

                    <div data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">💻</div>

                            <h3 className="text-xl font-bold mt-5">
                                Full Stack Development
                            </h3>

                            <p className="mt-4 text-gray-600">
                                HTML, CSS, JavaScript, React, Node.js,
                                Express and MongoDB.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">🐍</div>

                            <h3 className="text-xl font-bold mt-5">
                                Python Programming
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn Python from basics to advanced
                                with practical projects.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">📊</div>

                            <h3 className="text-xl font-bold mt-5">
                                Data Analytics
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Excel, SQL, Power BI and data
                                visualization techniques.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">☁️</div>

                            <h3 className="text-xl font-bold mt-5">
                                Cloud Computing
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn cloud concepts, deployment
                                and cloud services.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* More Courses */}

            <section className="pb-20">

                <div data-aos="fade-up" className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">☕</div>

                            <h3 className="text-xl font-bold mt-5">
                                Java Programming
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn Core Java, OOP concepts and build desktop and web applications.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">💻</div>

                            <h3 className="text-xl font-bold mt-5">
                                C & C++
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Build a strong programming foundation with C and C++.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">🌐</div>

                            <h3 className="text-xl font-bold mt-5">
                                Networking
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Learn networking concepts, routing, switching and network security.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-2 duration-300">

                            <div className="text-5xl">📱</div>

                            <h3 className="text-xl font-bold mt-5">
                                Digital Marketing
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Master SEO, social media marketing, Google Ads and branding.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Why Learn With Us */}

            <section className="bg-blue-50 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Why Learn With DigiQuestPC?
                        </h2>

                        <p className="mt-5 text-gray-600">
                            We focus on practical learning and career growth.
                        </p>

                    </div>

                    <div data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">

                            <div className="text-5xl">👨‍🏫</div>

                            <h3 className="font-bold text-xl mt-5">
                                Expert Trainers
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Learn from experienced professionals with industry knowledge.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">

                            <div className="text-5xl">🧑‍💻</div>

                            <h3 className="font-bold text-xl mt-5">
                                Practical Learning
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Hands-on projects and real-world assignments.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">

                            <div className="text-5xl">📜</div>

                            <h3 className="font-bold text-xl mt-5">
                                Certification
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Receive a certificate after successful course completion.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">

                            <div className="text-5xl">💼</div>

                            <h3 className="font-bold text-xl mt-5">
                                Placement Support
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Resume building, mock interviews and career guidance.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Course Features */}

            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Course Features
                        </h2>

                        <p className="mt-5 text-gray-600">
                            Everything you need to become industry ready.
                        </p>

                    </div>

                    <div data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">📚 Live Classes</h3>
                            <p className="mt-3 text-gray-600">
                                Interactive classroom sessions with practical demonstrations.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">💻 Hands-on Projects</h3>
                            <p className="mt-3 text-gray-600">
                                Work on real-world projects to improve practical skills.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">🎓 Certification</h3>
                            <p className="mt-3 text-gray-600">
                                Get a course completion certificate after training.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">📖 Study Material</h3>
                            <p className="mt-3 text-gray-600">
                                Notes, assignments and practice questions for every module.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">🤝 Doubt Support</h3>
                            <p className="mt-3 text-gray-600">
                                Get one-to-one guidance whenever you need help.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold">💼 Placement Assistance</h3>
                            <p className="mt-3 text-gray-600">
                                Resume building, interview preparation and placement support.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Learning Process */}

            <section className="bg-blue-50 py-20">

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-4xl font-bold">
                        Learning Process
                    </h2>

                    <p className="mt-5 text-gray-600">
                        Your journey from enrollment to placement.
                    </p>

                    <div data-aos="fade-up" className="grid md:grid-cols-5 gap-6 mt-14">

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-4xl">1️⃣</div>
                            <h3 className="font-semibold mt-4">Enroll</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-4xl">2️⃣</div>
                            <h3 className="font-semibold mt-4">Learn</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-4xl">3️⃣</div>
                            <h3 className="font-semibold mt-4">Practice</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-4xl">4️⃣</div>
                            <h3 className="font-semibold mt-4">Get Certified</h3>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <div className="text-4xl">5️⃣</div>
                            <h3 className="font-semibold mt-4">Get Placed</h3>
                        </div>

                    </div>

                </div>

            </section>

            {/* Call To Action */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-4xl font-bold">
                        Start Learning Today
                    </h2>

                    <p className="mt-6 text-lg text-blue-100">
                        Join DigiQuestPC and build your future with practical training,
                        expert guidance and placement support.
                    </p>

                    <Link to='/Enroll'>
                        <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                            Enroll
                        </li>
                    </Link>
                </div>

            </section>

        </div>
    );
}

export default Course;