import React from "react";
import placement from '../assets/palcement.png'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Placement() {

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


            {/* About Placement */}

            <section >

                <div className="bg-gradient-to-r from-blue-600 via-black-500 to-blue-400 text-white py-18">

                    <div className="max-w-7xl mx-auto px-6 text-center" >

                        <h2 data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-5xl md:text-6xl font-bold">
                            Placement Support
                        </h2>

                        <p data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-xl mt-8 max-w-4xl mx-auto leading-9">
                            At DigiQuestPC, our placement support is focused on helping
                            students build confidence, improve technical knowledge,
                            and prepare for real company interviews.
                        </p>

                    </div>
                </div>


                <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center">

                    <div>

                        <img
                            src={placement}
                            alt=""
                            className="rounded-3xl shadow-2xl hover:scale-105 duration-500"
                        />

                    </div>

                    <div>

                        <h3 className="text-3xl font-bold text-gray-800">
                            Building Careers, Not Just Skills
                        </h3>

                        <p className="mt-6 text-gray-600 leading-8">

                            Our goal is to prepare every student for today's job
                            market with practical learning and career guidance.

                        </p>

                        <p className="mt-5 text-gray-600 leading-8">

                            We provide resume building, mock interviews,
                            communication skill development and continuous support
                            throughout the placement process.

                        </p>

                    </div>

                </div>
            </section>

            {/* Why Choose */}

            <section className="bg-blue-50 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Why Our Placement Program?
                        </h2>

                        <p className="text-gray-600 mt-5">
                            Everything you need to become job-ready.
                        </p>

                    </div>

                    <div  data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg duration-500 hover:-translate-y-6">

                            <div className="text-5xl">📄</div>

                            <h3 className="font-bold text-xl mt-5">
                                Resume Building
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Create professional resumes that impress recruiters.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-6 hover:shadow-2xl duration-500">

                            <div className="text-5xl">🎤</div>

                            <h3 className="font-bold text-xl mt-5">
                                Mock Interviews
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Practice technical and HR interviews with mentors.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover: shadow-2xl duration-500 hover:-translate-y-6 ">

                            <div className="text-5xl">💬</div>

                            <h3 className="font-bold text-xl mt-5 ">
                                Soft Skills
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Improve communication and professional confidence.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl duration-500 hover:-translate-y-6">

                            <div className="text-5xl">💼</div>

                            <h3 className="font-bold text-xl mt-5">
                                Placement Assistance
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Continuous guidance until you get your first job.
                            </p>

                        </div>

                    </div>

                </div>

            </section>
            {/* Placement Process */}

            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-gray-800">
                            Our Placement Process
                        </h2>

                        <p className="mt-4 text-gray-600">
                            A simple step-by-step journey from learning to getting hired.
                        </p>

                    </div>

                    <div  data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

                        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                1
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Learn Skills
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Practical classroom and lab-based training.
                            </p>
                        </div>

                        <div  className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                2
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Live Projects
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Work on real projects to gain practical experience.
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                3
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Interview Prep
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Resume building, aptitude and mock interviews.
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                4
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Get Placed
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Attend interviews and start your professional career.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Placement Highlights */}

            <section className="bg-blue-700 py-20 text-white">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Placement Highlights
                        </h2>

                    </div>

                    <div  data-aos="fade-up" className="grid lg:grid-cols-4 gap-8 mt-14">

                        <div className="bg-white/10 rounded-xl p-8 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <h1 className="text-5xl font-bold">500+</h1>
                            <p className="mt-3">Students Trained</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-8 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <h1 className="text-5xl font-bold">90%</h1>
                            <p className="mt-3">Placement Support</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-8 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <h1 className="text-5xl font-bold">50+</h1>
                            <p className="mt-3">Hiring Partners</p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-8 text-center hover:shadow-lg duration-500 hover:-translate-y-6">
                            <h1 className="text-5xl font-bold">₹3LPA+</h1>
                            <p className="mt-3">Average Package</p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Hiring Partners */}

            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-gray-800">
                            Hiring Partners
                        </h2>

                        <p className="mt-4 text-gray-600">
                            We connect students with growing IT companies and startups.
                        </p>

                    </div>

                    <div  data-aos="fade-up"
                     className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-14">

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            Tech Solutions
                        </div>

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            WebNest
                        </div>

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            SoftTech
                        </div>

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            CodeCraft
                        </div>

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            NextGen IT
                        </div>

                        <div className="bg-white shadow rounded-lg p-5 text-center font-semibold hover:shadow-lg duration-500 hover:-translate-y-6">
                            Digital Works
                        </div>

                    </div>

                </div>

            </section>
            {/* Student Success */}

            <section className="bg-gray-100 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold text-gray-800">
                            Student Success Stories
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Our students are building successful careers after completing their training.
                        </p>

                    </div>

                    <div    data-aos="fade-up"
                    className="grid md:grid-cols-3 gap-8 mt-14 ">

                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-lg duration-500 hover:-translate-y-6 ">

                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                                R
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Rahul Singh
                            </h3>

                            <p className="text-gray-500">
                                Full Stack Development
                            </p>

                            <p className="mt-4 text-gray-600">
                                "The practical training and mock interviews helped me
                                crack my first job interview with confidence."
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-lg duration-500 hover:-translate-y-6">

                            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
                                    P   
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Priya Sharma
                            </h3>

                            <p className="text-gray-500">
                                Data Analytics
                            </p>

                            <p className="mt-4 text-gray-600">
                                "Excellent mentors, live projects and placement guidance.
                                I learned skills that are useful in real companies."
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-lg duration-500 hover:-translate-y-6">

                            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
                                A
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                Aman Verma
                            </h3>

                            <p className="text-gray-500">
                                Networking
                            </p>

                            <p className="mt-4 text-gray-600">
                                "The placement support team guided me throughout the
                                interview process and helped me start my career."
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Call To Action */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

                <div  data-aos="zoom-in"
    className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white text-center px-10 py-20 shadow-2xl">

                    <h2 className="text-4xl font-bold">
                        Ready to Start Your Career?
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-blue-100">
                        Join DigiQuestPC and learn from experienced mentors,
                        work on practical projects, improve your skills,
                        and get placement support to build your future.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                          <Link to='/Enroll'>
                            <li className="cursor-pointer hover:text-blue-600 hover:-translate-y-1 transition duration-300">
                                Enroll
                            </li>
                        </Link>
                        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 duration-300">
                            Contact Us
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Placement;