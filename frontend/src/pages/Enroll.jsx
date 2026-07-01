import react from "react";
import { Link } from "react-router-dom";
import {useState} from "react"; 
import logo from "../assets/logo.png";
import aos from "aos";

function Enroll() {
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

   
  return(
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 ">
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

    <div  className="max-w-5xl mx-auto px-6">

        <div  className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Left Side */}

            <div data-aos="fade-right" className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-10 flex flex-col justify-center">

                <h1 className="text-4xl font-bold">
                    Join DigiQuestPC
                </h1>

                <p className="mt-6 leading-8 text-blue-100">
                    Start your journey with industry-focused training,
                    live projects and placement support.
                </p>

                <div className="mt-10 space-y-4">

                    <p>✅ Expert Trainers</p>

                    <p>✅ Live Projects</p>

                    <p>✅ Placement Assistance</p>

                    <p>✅ Industry Certificate</p>

                </div>

            </div>

            {/* Right Side */}

            <div data-aos="fade-left" className="p-10">

                <h2 className="text-3xl font-bold text-center">
                    Enroll Now
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    Fill the form and we'll contact you soon.
                </p>

                <form className="mt-8 space-y-5"      >

                    {/* Name */}

                    <div>

                        <label className="font-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.name}
                            onChange={(e)=>setFormData({...formData,name:e.target.value})}
                        />

                    </div>

                    {/* Email */}

                    <div>

                        <label className="font-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.email}
                            onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        />

                    </div>

                    {/* Phone */}

                    <div>

                        <label className="font-semibold">
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.phone}
                            onChange={(e)=>setFormData({...formData,phone:e.target.value})}
                        />

                    </div>

                    {/* Course */}

                    <div>

                        <label className="font-semibold">
                            Select Course
                        </label>

                        <select
                            className="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.course}
                            onChange={(e)=>setFormData({...formData,course:e.target.value})}
                        >

                            <option>Select Course</option>

                            <option>Full Stack Development</option>

                            <option>Python Programming</option>

                            <option>Java Programming</option>

                            <option>Data Analytics</option>

                            <option>Cloud Computing</option>

                            <option>Networking</option>

                            <option>Digital Marketing</option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 duration-300 font-semibold"
                    >
                        Enroll Now
                    </button>

                </form>

            </div>

        </div>

    </div>

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
export default Enroll;