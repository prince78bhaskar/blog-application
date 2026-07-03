import react from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import aos from "aos";
import axios from "axios";
import { courseAPI } from '../services/api';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
function Enroll() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      toast.error('Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.phone)) {
      toast.error('Invalid mobile number (must be 10 digits)');
      return;
    }

    try {
      setLoading(true);

      const base = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.post(`${base}/registerUser`, formData);

      setLoading(false);
      toast.success("Enrollment Successful 🎉");

      console.log(response);

      console.log(response.data);

    } catch (error) {
      // console.log(error);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Enrollment Failed");
    }

  }

  // fetch courses for select
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await courseAPI.getAllCourses();
        if (mounted) setCourses(res.data.courses || []);
      } catch (err) {
        // ignore
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 ">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl sm:rounded-3xl shadow-lg md:shadow-xl overflow-hidden">

          {/* Left Side */}

          <div data-aos="fade-right" className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Join DigiQuestPC
            </h1>

            <p className="mt-4 sm:mt-5 md:mt-6 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base text-blue-100">
              Start your journey with industry-focused training,
              live projects and placement support.
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4">

              <p className="text-sm sm:text-base">✅ Expert Trainers</p>

              <p className="text-sm sm:text-base">✅ Live Projects</p>

              <p className="text-sm sm:text-base">✅ Placement Assistance</p>

              <p className="text-sm sm:text-base">✅ Industry Certificate</p>

            </div>

          </div>

          {/* Right Side */}

          <div data-aos="fade-left" className="p-6 sm:p-8 md:p-10">

            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Enroll Now
            </h2>

            <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
              Fill the form and we'll contact you soon.
            </p>

            <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>

              {/* Name */}

              <div>

                <label className="font-semibold text-sm sm:text-base">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-2 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

              </div>

              {/* Email */}

              <div>

                <label className="font-semibold text-sm sm:text-base">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

              </div>

              {/* Phone */}

              <div>

                <label className="font-semibold text-sm sm:text-base">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full mt-2 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

              </div>

              {/* Course */}

              <div>

                <label className="font-semibold text-sm sm:text-base">
                  Select Course
                </label>

                <select
                  className="w-full mt-2 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  <option value="">Select Course</option>
                  {courses.length > 0 ? (
                    courses.map((c) => (
                      <option key={c._id} value={c._id}>{c.title}</option>
                    ))
                  ) : (
                    <option disabled>Loading courses...</option>
                  )}
                </select>

              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-800 duration-300 font-semibold text-sm sm:text-base"
                onClick={handleSubmit}

              >
                {
                  loading
                    ?
                    "Loading..."
                    :
                    "Submit"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

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
export default Enroll;