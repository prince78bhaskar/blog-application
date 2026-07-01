import React from "react";
import placement from '../assets/palcement.png'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import placementBg from "../assets/placement.png";
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

                <div className="text-white py-24 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(50,0,0,0.6), rgba(0,0,50,0.6)), url(${placementBg})`,
                  }}>

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


                <div className="grid lg:grid-cols-2 gap-14 items-center mt-20">

  {/* Image */}

  <div
  data-aos="fade-right"
  className="overflow-hidden rounded-3xl lg:pl-8"
>
  <img
    src={placement}
    alt="Placement Support"
    className="w-full rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
  />
</div>

  {/* Content */}
  <div data-aos="fade-left">

    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
      Career Support
    </span>

    <h2 className="text-4xl font-bold text-gray-900 mt-5 leading-tight">
      Building Careers,
      <span className="text-blue-600"> Not Just Skills</span>
    </h2>

    <p className="mt-6 text-gray-600 text-lg leading-8">
      We prepare every student for today's competitive job market through
      practical training, live projects, and expert career guidance.
    </p>

    <p className="mt-5 text-gray-600 text-lg leading-8">
      From resume building and mock interviews to communication skills and
      placement assistance, we support you at every step of your career journey.
    </p>

    {/* Highlights */}
    <div className="grid grid-cols-2 gap-4 mt-8">

      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-2xl">✔</span>
        <span className="font-medium text-gray-700">Resume Building</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-2xl">✔</span>
        <span className="font-medium text-gray-700">Mock Interviews</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-2xl">✔</span>
        <span className="font-medium text-gray-700">Soft Skills</span>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <span className="text-green-500 text-2xl">✔</span>
        <span className="font-medium text-gray-700">Placement Support</span>
      </div>

    </div>

  </div>

</div>

            </section>

            {/* Why Choose */}

            <section className="bg-blue-50 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div data-aos="fade-up" className="text-center">

                        <h2 className="text-4xl font-bold">
                            Why Our Placement Program?
                        </h2>

                        <p className="text-gray-600 mt-5">
                            Everything you need to become job-ready.
                        </p>

                    </div>

                    <div  data-aos="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg duration-500 hover:-translate-y-6 border border-gray-700">

                            <div className="text-5xl">📄</div>

                            <h3 className="font-bold text-xl mt-5">
                                Resume Building
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Create professional resumes that impress recruiters.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-6 hover:shadow-2xl duration-500 border border-gray-700">

                            <div className="text-5xl">🎤</div>

                            <h3 className="font-bold text-xl mt-5">
                                Mock Interviews
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Practice technical and HR interviews with mentors.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover: shadow-2xl duration-500 hover:-translate-y-6 border border-gray-700">

                            <div className="text-5xl">💬</div>

                            <h3 className="font-bold text-xl mt-5 ">
                                Soft Skills
                            </h3>

                            <p className="mt-3 text-gray-600">
                                Improve communication and professional confidence.
                            </p>

                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl duration-500 hover:-translate-y-6 border border-gray-700">

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

          <section className="py-18 bg-gradient-to-b from-gray-50 to-white">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center" data-aos="fade-up">

      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
        PLACEMENT JOURNEY
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
        Our Placement Process
      </h2>

      <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-lg">
        Follow our structured learning path that transforms students into
        industry-ready professionals.
      </p>

    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {/* Card 1 */}
      <div
        data-aos="fade-up"
        className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition">
          1
        </div>

        <h3 className="mt-6 text-2xl font-bold text-center">
          Learn Skills
        </h3>

        <p className="mt-4 text-gray-600 text-center leading-7">
          Master industry-relevant technologies through practical classroom
          and lab-based learning.
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition">
          2
        </div>

        <h3 className="mt-6 text-2xl font-bold text-center">
          Live Projects
        </h3>

        <p className="mt-4 text-gray-600 text-center leading-7">
          Build real-world projects to strengthen your portfolio and gain
          hands-on experience.
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition">
          3
        </div>

        <h3 className="mt-6 text-2xl font-bold text-center">
          Interview Prep
        </h3>

        <p className="mt-4 text-gray-600 text-center leading-7">
          Resume building, aptitude practice, mock interviews and
          communication skill training.
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 border-gray-700"
      >
        <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition">
          4
        </div>

        <h3 className="mt-6 text-2xl font-bold text-center">
          Get Placed
        </h3>

        <p className="mt-4 text-gray-600 text-center leading-7">
          Attend company interviews with confidence and launch your
          professional career.
        </p>
      </div>

    </div>

  </div>

</section>

            {/* Placement Highlights */}

       <section className="py-24 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 text-white overflow-hidden">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center" data-aos="fade-up">

      <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-blue-100 font-semibold">
        OUR ACHIEVEMENTS
      </span>

      <h2 className="text-4xl md:text-5xl font-bold mt-5">
        Placement Highlights
      </h2>

      <p className="mt-5 text-blue-100 max-w-2xl mx-auto text-lg">
        Our students have successfully launched their careers through
        industry-focused training and dedicated placement support.
      </p>

    </div>

    {/* Stats */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {/* Card 1 */}
      <div
        data-aos="zoom-in"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-5xl font-extrabold text-cyan-300 group-hover:scale-110 transition">
          500+
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Students Trained
        </p>
      </div>

      {/* Card 2 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-5xl font-extrabold text-green-300 group-hover:scale-110 transition">
          90%
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Placement Support
        </p>
      </div>

      {/* Card 3 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-5xl font-extrabold text-yellow-300 group-hover:scale-110 transition">
          50+
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Hiring Partners
        </p>
      </div>

      {/* Card 4 */}
      <div
        data-aos="zoom-in"
        data-aos-delay="300"
        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center hover:-translate-y-3 hover:bg-white/20 transition-all duration-500"
      >
        <h1 className="text-5xl font-extrabold text-pink-300 group-hover:scale-110 transition">
          ₹3LPA+
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Average Package
        </p>
      </div>

    </div>

  </div>

</section>

          
            {/* Student Success */}

    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <div className="text-center mb-16" data-aos="fade-up">

      <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
        SUCCESS STORIES
      </span>

      <h2 className="text-4xl md:text-5xl font-bold mt-5 text-gray-900">
        👨‍💻 Developer Stories
      </h2>

      <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
        Real experiences from developers who transformed their careers
        with our practical training, live projects and placement support.
      </p>

    </div>

    {/* Cards */}

    <div
      data-aos="fade-up"
      className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
    >

      {/* Card 1 */}

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl">
            👨‍💻
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Sagar Patel
            </h3>

            <p className="text-blue-600 font-medium">
              Full Stack Developer
            </p>

            <span className="text-sm text-gray-500">
              Joined: Sept 2024
            </span>
          </div>

        </div>

        <p className="mt-6 text-gray-600 leading-8 italic">
          "The MERN Stack training was comprehensive and practical.
          Our instructors explained every concept with real-world
          examples. Within 3 months I secured a placement at a
          startup with excellent career growth."
        </p>

        <div className="border-t mt-8 pt-6 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900">
              TechStartup Inc
            </h4>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Package</p>
            <h4 className="text-2xl font-bold text-green-600">
              ₹8.5 LPA
            </h4>
          </div>

        </div>

      </div>

      {/* Card 2 */}

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-pink-600 text-white flex items-center justify-center text-3xl">
            👩‍💻
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Neha Sharma
            </h3>

            <p className="text-pink-600 font-medium">
              Python Full Stack Developer
            </p>

            <span className="text-sm text-gray-500">
              Joined: Aug 2024
            </span>
          </div>

        </div>

        <p className="mt-6 text-gray-600 leading-8 italic">
          "The hands-on projects and one-to-one mentorship completely
          transformed my learning journey. The placement team
          supported me until I received my dream offer."
        </p>

        <div className="border-t mt-8 pt-6 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900">
              Tech Solutions
            </h4>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Package</p>
            <h4 className="text-2xl font-bold text-green-600">
              ₹10 LPA
            </h4>
          </div>

        </div>

      </div>

      {/* Card 3 */}

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl">
            🎨
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Vikram Singh
            </h3>

            <p className="text-purple-600 font-medium">
              UI/UX Designer
            </p>

            <span className="text-sm text-gray-500">
              Joined: Oct 2024
            </span>
          </div>

        </div>

        <p className="mt-6 text-gray-600 leading-8 italic">
          "Amazing learning experience with industry mentors.
          The portfolio projects we built helped me secure
          a design role at a leading company."
        </p>

        <div className="border-t mt-8 pt-6 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">Placed At</p>
            <h4 className="font-bold text-gray-900">
              Design Studio
            </h4>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Package</p>
            <h4 className="text-2xl font-bold text-green-600">
              ₹7.5 LPA
            </h4>
          </div>

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

export default Placement;