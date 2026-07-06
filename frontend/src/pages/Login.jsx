import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handle Submit Called");
    setLoading(true);
    console.log("Username:", username);
    console.log("Password:", password);
    const result = await login(username, password);

    if (result.success) {
      toast.success('Login successful');
      setLoading(false);
      // Redirect based on user role
      if (result.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      return;
    }
    console.log("data which is coming from ",result.response?.data);
    toast.error(result.message);
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to DigiQuest</h1>
          
          <form onSubmit={handleSubmit}>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                autoComplete="username"
                required
                onChange={(e)=>{
                  setUsername(e.target.value)
                }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                 onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/Course" className="text-blue-500 hover:text-blue-600 font-semibold">
                Enroll in a Course
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
