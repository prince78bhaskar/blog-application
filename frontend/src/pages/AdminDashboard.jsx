import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { adminAPI, courseAPI } from '../services/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    image: '',
    banner: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    price: '',
    category: '',
    isActive: true,
    features: [],
    syllabus: [],
    faqs: [],
    demoVideo: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchAdminData();
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      const [statsRes, studentsRes, coursesRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllStudents(),
        adminAPI.getAllCourses()
      ]);

      setStats(statsRes.data.stats);
      setStudents(statsRes.data.recentStudents || studentsRes.data.students);
      setCourses(coursesRes.data.courses);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load admin data');
      setLoading(false);
    }
  };

  const handleSearchStudents = async () => {
    try {
      const response = await adminAPI.getAllStudents(searchTerm);
      setStudents(response.data.students);
    } catch (error) {
      toast.error('Failed to search students');
    }
  };

  const handleSearchCourses = async () => {
    try {
      const response = await adminAPI.getAllCourses(searchTerm);
      setCourses(response.data.courses);
    } catch (error) {
      toast.error('Failed to search courses');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await adminAPI.deleteStudent(studentId);
      toast.success('Student deleted successfully');
      fetchAdminData();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: '',
      description: '',
      image: '',
      banner: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      price: '',
      category: '',
      isActive: true,
      features: [],
      syllabus: [],
      faqs: [],
      demoVideo: ''
    });
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      image: course.image,
      banner: course.banner,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price,
      category: course.category,
      isActive: course.isActive,
      features: course.features || [],
      syllabus: course.syllabus || [],
      faqs: course.faqs || [],
      demoVideo: course.demoVideo || ''
    });
    setShowCourseForm(true);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await courseAPI.deleteCourse(courseId);
      toast.success('Course deleted successfully');
      fetchAdminData();
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleCourseFormSubmit = async (e) => {
    e.preventDefault();

    console.log('========== COURSE FORM SUBMISSION ==========');
    console.log('Form data:', courseForm);

    if (!courseForm.title || !courseForm.description || !courseForm.price || !courseForm.category) {
      console.log('Validation failed: Missing required fields');
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const courseData = {
        ...courseForm,
        price: Number(courseForm.price),
        language: courseForm.language || 'English',
        features: courseForm.features.filter(f => f.trim() !== ''),
        syllabus: courseForm.syllabus.filter(s => s.module && s.module.trim() !== ''),
        faqs: courseForm.faqs.filter(f => f.question && f.question.trim() !== '')
      };

      console.log('Course data to be sent:', JSON.stringify(courseData, null, 2));

      if (editingCourse) {
        console.log('Updating course with ID:', editingCourse._id);
        const response = await courseAPI.updateCourse(editingCourse._id, courseData);
        console.log('Update response:', response.data);
        toast.success('Course updated successfully');
      } else {
        console.log('Creating new course');
        const response = await courseAPI.createCourse(courseData);
        console.log('Create response:', response.data);
        toast.success('Course created successfully');
      }

      setShowCourseForm(false);
      fetchAdminData();
    } catch (error) {
      console.error('========== COURSE SAVE ERROR ==========');
      console.error('Error object:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      toast.error(error.response?.data?.message || 'Failed to save course');
    }
  };

  const handleCourseFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseForm({
      ...courseForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayFieldChange = (field, index, value) => {
    const newArray = [...courseForm[field]];
    newArray[index] = value;
    setCourseForm({
      ...courseForm,
      [field]: newArray
    });
  };

  const addArrayField = (field) => {
    setCourseForm({
      ...courseForm,
      [field]: [...courseForm[field], '']
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = courseForm[field].filter((_, i) => i !== index);
    setCourseForm({
      ...courseForm,
      [field]: newArray
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'courses', label: 'Courses', icon: '📚' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-purple-600">Admin Panel</h2>
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
                        ? 'bg-purple-500 text-white'
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
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition font-semibold"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </motion.button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Students</h3>
                  <p className="text-4xl font-bold text-blue-600">{stats?.totalStudents || 0}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Courses</h3>
                  <p className="text-4xl font-bold text-green-600">{stats?.totalCourses || 0}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Enrollments</h3>
                  <p className="text-4xl font-bold text-purple-600">{stats?.totalEnrollments || 0}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
                >
                  <h3 className="text-gray-600 font-semibold mb-2">Total Revenue</h3>
                  <p className="text-4xl font-bold text-orange-600">₹{stats?.totalRevenue || 0}</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Enrollments</h2>
                  <div className="space-y-3">
                    {stats?.recentEnrollments?.slice(0, 5).map((enrollment) => (
                      <div key={enrollment._id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-800">{enrollment.userId?.name}</p>
                        <p className="text-sm text-gray-600">{enrollment.courseId?.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Students</h2>
                  <div className="space-y-3">
                    {stats?.recentStudents?.slice(0, 5).map((student) => (
                      <div key={student._id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'students' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search students by name, email, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    onClick={handleSearchStudents}
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Search
                  </motion.button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.purchasedCourses?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.button
                            onClick={() => handleDeleteStudent(student._id)}
                            whileHover={{ scale: 1.05 }}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Search courses by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    onClick={handleSearchCourses}
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Search
                  </motion.button>
                  <motion.button
                    onClick={handleAddCourse}
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    + Add Course
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
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
                      <p className="text-gray-600 mb-2">{course.instructor}</p>
                      <p className="text-gray-600 mb-4">₹{course.price}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">
                          {course.enrolledCount || 0} enrolled
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {course.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEditCourse(course)}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteCourse(course._id)}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {showCourseForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                  </h2>
                  <button
                    onClick={() => setShowCourseForm(false)}
                    className="text-2xl text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleCourseFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Course Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={courseForm.title}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                      <input
                        type="text"
                        name="category"
                        value={courseForm.category}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Instructor *</label>
                      <input
                        type="text"
                        name="instructor"
                        value={courseForm.instructor}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Duration *</label>
                      <input
                        type="text"
                        name="duration"
                        value={courseForm.duration}
                        onChange={handleCourseFormChange}
                        placeholder="e.g., 6 Months"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Level *</label>
                      <select
                        name="level"
                        value={courseForm.level}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={courseForm.price}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
                      <input
                        type="url"
                        name="image"
                        value={courseForm.image}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Banner URL *</label>
                      <input
                        type="url"
                        name="banner"
                        value={courseForm.banner}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                      <textarea
                        name="description"
                        value={courseForm.description}
                        onChange={handleCourseFormChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">Demo Video URL</label>
                      <input
                        type="url"
                        name="demoVideo"
                        value={courseForm.demoVideo}
                        onChange={handleCourseFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={courseForm.isActive}
                          onChange={handleCourseFormChange}
                          className="w-5 h-5"
                        />
                        <span className="text-gray-700 font-semibold">Active (Visible to users)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Features</label>
                    {courseForm.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Feature"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('features', index)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayField('features')}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                      + Add Feature
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold"
                    >
                      {editingCourse ? 'Update Course' : 'Create Course'}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowCourseForm(false)}
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
