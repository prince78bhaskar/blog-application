import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardAPI.getDashboardData();
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600">DigiQuest</h2>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <motion.button
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-semibold"
            >
              <span>🚪</span>
              <span>Logout</span>
            </motion.button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="md:hidden mb-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {mobileMenuOpen ? 'Close Menu' : 'Menu'}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-lg p-4 mb-6">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-semibold"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'home' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Welcome back, {user?.name}! 👋
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Courses</h3>
                  <p className="text-4xl font-bold text-blue-600">
                    {dashboardData?.totalCourses || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Spent</h3>
                  <p className="text-4xl font-bold text-green-600">
                    ₹{dashboardData?.totalSpent || 0}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Enrollments</h3>
                  <p className="text-4xl font-bold text-purple-600">
                    {dashboardData?.enrollments?.length || 0}
                  </p>
                </motion.div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Enrollments</h2>
                {dashboardData?.enrollments?.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.enrollments.slice(0, 5).map((enrollment) => (
                      <div
                        key={enrollment._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {enrollment.courseId?.title || 'Course'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Link
                          to={`/dashboard/course/${enrollment.courseId?._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    No enrollments yet.{' '}
                    <Link to="/Course" className="text-blue-500 hover:text-blue-600 font-semibold">
                      Browse Courses
                    </Link>
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>
              
              {dashboardData?.user?.purchasedCourses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.user.purchasedCourses.map((course) => (
                    <motion.div
                      key={course._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                        <Link
                          to={`/dashboard/course/${course._id}`}
                          className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">You haven't purchased any courses yet.</p>
                  <Link
                    to="/Course"
                    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
                  >
                    Browse Courses
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
              
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Name</label>
                    <p className="text-gray-800 text-lg">{user?.name}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Email</label>
                    <p className="text-gray-800 text-lg">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Username</label>
                    <p className="text-gray-800 text-lg">{user?.username}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Role</label>
                    <p className="text-gray-800 text-lg capitalize">{user?.role}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Member Since</label>
                    <p className="text-gray-800 text-lg">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
