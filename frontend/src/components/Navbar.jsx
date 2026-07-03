import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-24 sm:w-32 md:w-40 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <ul className="hidden md:flex items-center justify-center gap-8 text-gray-700 font-semibold text-base">
          <Link to="/">
            <motion.li
              whileHover={{ y: -3, color: '#2563eb' }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              Home
            </motion.li>
          </Link>

          <Link to="/About">
            <motion.li
              whileHover={{ y: -3, color: '#2563eb' }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              About Us
            </motion.li>
          </Link>

          <Link to="/placement">
            <motion.li
              whileHover={{ y: -3, color: '#2563eb' }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              Placement
            </motion.li>
          </Link>

          <Link to="/Course">
            <motion.li
              whileHover={{ y: -3, color: '#2563eb' }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              Courses
            </motion.li>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <motion.li
                  whileHover={{ y: -3, color: '#2563eb' }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  Dashboard
                </motion.li>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <Link to="/login">
              <motion.li
                whileHover={{ y: -3, color: '#2563eb' }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              >
                Login
              </motion.li>
            </Link>
          )}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-semibold">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/About" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/placement" onClick={() => setMobileMenuOpen(false)}>Placement</Link>
            <Link to="/Course" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
