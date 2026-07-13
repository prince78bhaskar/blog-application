import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { adminAPI, courseAPI, learningContentAPI, testimonialAPI } from '../services/api';
import { validateVideoUrl, getEmbedVideoUrl, getVideoProvider } from '../utils/videoUtils';
import UniversalVideoPlayer from '../components/UniversalVideoPlayer';
import {Link} from "react-router-dom";

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
  const [courseFormLoading, setCourseFormLoading] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    image: '',
    imagePublicId: '',
    banner: '',
    bannerPublicId: '',
    instructor: '',
    duration: '',
    language: 'English',
    level: 'Beginner',
    price: '',
    category: '',
    isActive: true,
    features: [],
    syllabus: [],
    faqs: [],
    demoVideo: '',
    demoVideoPublicId: '',

    // Mode selection (upload vs url)
    thumbnailMode: 'upload',
    bannerMode: 'upload',
    previewVideoMode: 'upload',
    notesMode: 'upload',

    // URL inputs (used when mode === 'url')
    thumbnailUrl: '',
    bannerUrl: '',
    previewVideoUrl: '',
    notesUrlItems: [],

    // File upload fields
    thumbnailFile: null,
    bannerFile: null,
    previewVideoFile: null
  });
  const [selectedCourseForContent, setSelectedCourseForContent] = useState(null);
  const [learningContent, setLearningContent] = useState([]);
  const [showContentForm, setShowContentForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentFormLoading, setContentFormLoading] = useState(false);
  const [contentForm, setContentForm] = useState({
    courseId: '',
    title: '',
    type: 'video',
    videoUrl: '',
    pdfUrl: '',
    thumbnail: '',
    description: '',
    duration: '',
    sequence: 0,
    
    // Mode selection (upload vs url)
    videoMode: 'upload',
    pdfMode: 'upload',
    thumbnailMode: 'upload',
    
    // File upload fields
    videoFile: null,
    pdfFile: null,
    thumbnailFile: null
  });

  // Testimonial state
  const [testimonials, setTestimonials] = useState([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialFormLoading, setTestimonialFormLoading] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    studentName: '',
    courseName: '',
    designation: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    displayOrder: 0,
    isActive: true,

    // Mode selection (upload vs url)
    videoMode: 'upload',
    thumbnailMode: 'upload',

    // File upload fields
    videoFile: null,
    thumbnailFile: null
  });

  useEffect(() => {
    // FIX: Removed 'navigate' from dependencies to prevent duplicate API calls
    // navigate function is stable and doesn't change, so it doesn't need to be in deps
    // Added cleanup flag to prevent duplicate calls in React StrictMode (development only)
    let isMounted = true;

    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    if (isMounted) {
      fetchAdminData();
    }

    return () => {
      isMounted = false;
    };
  }, [user]); // Only depend on user, not navigate

  useEffect(() => {
    if (activeTab === 'testimonials') {
      fetchTestimonials();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'testimonials') {
      fetchTestimonials();
    }
  }, [activeTab]);

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
      imagePublicId: '',
      banner: '',
      bannerPublicId: '',
      instructor: '',
      duration: '',
      language: 'English',
      level: 'Beginner',
      price: '',
      category: '',
      isActive: true,
      features: [],
      syllabus: [],
      faqs: [],
      demoVideo: '',
      demoVideoPublicId: '',

      // Mode selection (upload vs url)
      thumbnailMode: 'upload',
      bannerMode: 'upload',
      previewVideoMode: 'upload',
      notesMode: 'upload',

      // URL inputs
      thumbnailUrl: '',
      bannerUrl: '',
      previewVideoUrl: '',
      notesUrlItems: [],

      // File upload fields
      thumbnailFile: null,
      bannerFile: null,
      previewVideoFile: null
    });
    setShowCourseForm(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      image: course.image,
      imagePublicId: course.imagePublicId || '',
      banner: course.banner,
      bannerPublicId: course.bannerPublicId || '',
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price,
      category: course.category,
      isActive: course.isActive,
      features: course.features || [],
      syllabus: course.syllabus || [],
      faqs: course.faqs || [],
      demoVideo: course.demoVideo || '',
      demoVideoPublicId: course.demoVideoPublicId || '',
      notes: course.notes || [],
      
      // Mode selection based on existing data
      thumbnailMode: course.imagePublicId ? 'upload' : 'url',
      bannerMode: course.bannerPublicId ? 'upload' : 'url',
      previewVideoMode: course.demoVideoPublicId ? 'upload' : 'url',

      // URL inputs
      thumbnailUrl: course.imagePublicId ? '' : course.image,
      bannerUrl: course.bannerPublicId ? '' : course.banner,
      previewVideoUrl: course.demoVideoPublicId ? '' : course.demoVideo,

      // File upload fields
      thumbnailFile: null,
      bannerFile: null,
      previewVideoFile: null
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

    // FIX: Check if already loading to prevent duplicate submissions on double-click
    if (courseFormLoading) {
      console.log("Course form submission already in progress, ignoring duplicate submission");
      return;
    }

    console.log('========== COURSE FORM SUBMISSION ==========');
    console.log('Form data:', courseForm);

    if (!courseForm.title || !courseForm.description || !courseForm.price || !courseForm.category) {
      console.log('Validation failed: Missing required fields');
      toast.error('Please fill all required fields');
      return;
    }

    setCourseFormLoading(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add basic course fields
      formData.append('title', courseForm.title);
      formData.append('description', courseForm.description);
      formData.append('instructor', courseForm.instructor);
      formData.append('duration', courseForm.duration);
      formData.append('level', courseForm.level);
      formData.append('price', Number(courseForm.price));
      formData.append('category', courseForm.category);
      formData.append('isActive', courseForm.isActive);
      formData.append('language', courseForm.language || 'English');

      // Add mode fields
      formData.append('thumbnailMode', courseForm.thumbnailMode);
      formData.append('bannerMode', courseForm.bannerMode);
      formData.append('previewVideoMode', courseForm.previewVideoMode);

      // Add JSON fields as strings
      formData.append('features', JSON.stringify(courseForm.features.filter(f => f.trim() !== '')));
      formData.append('syllabus', JSON.stringify(courseForm.syllabus.filter(s => s.module && s.module.trim() !== '')));
      formData.append('faqs', JSON.stringify(courseForm.faqs.filter(f => f.question && f.question.trim() !== '')));

      // Handle thumbnail
      if (courseForm.thumbnailMode === 'upload') {
        if (courseForm.thumbnailFile) {
          formData.append('thumbnail', courseForm.thumbnailFile);
        } else if (courseForm.image) {
          formData.append('thumbnail', courseForm.image);
          formData.append('imagePublicId', courseForm.imagePublicId || '');
        }
      } else {
        // URL mode
        formData.append('thumbnail', courseForm.thumbnailUrl || courseForm.image || '');
        formData.append('imagePublicId', '');
      }

      // Handle banner
      if (courseForm.bannerMode === 'upload') {
        if (courseForm.bannerFile) {
          formData.append('banner', courseForm.bannerFile);
        } else if (courseForm.banner) {
          formData.append('banner', courseForm.banner);
          formData.append('bannerPublicId', courseForm.bannerPublicId || '');
        }
      } else {
        // URL mode
        formData.append('banner', courseForm.bannerUrl || courseForm.banner || '');
        formData.append('bannerPublicId', '');
      }

      // Handle demo video
      if (courseForm.previewVideoMode === 'upload') {
        if (courseForm.previewVideoFile) {
          formData.append('previewVideo', courseForm.previewVideoFile);
        } else if (courseForm.demoVideo) {
          formData.append('demoVideo', courseForm.demoVideo);
          formData.append('demoVideoPublicId', courseForm.demoVideoPublicId || '');
        }
      } else {
        // URL mode
        formData.append('demoVideo', courseForm.previewVideoUrl || courseForm.demoVideo || '');
        formData.append('demoVideoPublicId', '');
      }

      // Add existing notes if editing
      if (editingCourse && courseForm.notes) {
        formData.append('notes', JSON.stringify(courseForm.notes));
      }

      console.log('FormData prepared for upload');

      if (editingCourse) {
        console.log('Updating course with ID:', editingCourse._id);
        const response = await courseAPI.updateCourse(editingCourse._id, formData);
        console.log('Update response:', response.data);
        toast.success('Course updated successfully');
      } else {
        console.log('Creating new course');
        const response = await courseAPI.createCourse(formData);
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
    } finally {
      setCourseFormLoading(false);
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

  // File upload handlers
  const handleFileChange = (fieldName, file) => {
    setCourseForm({
      ...courseForm,
      [fieldName]: file
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

  const handleManageContent = async (course) => {
    setSelectedCourseForContent(course);
    try {
      const response = await learningContentAPI.getLearningContentByCourse(course._id);
      setLearningContent(response.data.learningContent);
      setActiveTab('course-content');
    } catch (error) {
      toast.error('Failed to load course content');
    }
  };

  const handleAddContent = () => {
    setEditingContent(null);
    setContentForm({
      courseId: selectedCourseForContent?._id || '',
      title: '',
      type: 'video',
      videoUrl: '',
      pdfUrl: '',
      thumbnail: '',
      description: '',
      duration: '',
      sequence: learningContent.filter(c => c.type === 'video').length,
      
      // Mode selection
      videoMode: 'upload',
      pdfMode: 'upload',
      thumbnailMode: 'upload',
      
      // File upload fields
      videoFile: null,
      pdfFile: null,
      thumbnailFile: null
    });
    setShowContentForm(true);
  };

  const handleEditContent = (content) => {
    setEditingContent(content);
    setContentForm({
      courseId: content.courseId._id || content.courseId,
      title: content.title,
      type: content.type,
      videoUrl: content.videoUrl || '',
      pdfUrl: content.pdfUrl || '',
      thumbnail: content.thumbnail || '',
      description: content.description || '',
      duration: content.duration || '',
      sequence: content.sequence,
      
      // Mode selection based on existing data
      videoMode: content.videoPublicId ? 'upload' : 'url',
      pdfMode: content.pdfPublicId ? 'upload' : 'url',
      thumbnailMode: content.thumbnailPublicId ? 'upload' : 'url',
      
      // File upload fields
      videoFile: null,
      pdfFile: null,
      thumbnailFile: null
    });
    setShowContentForm(true);
  };

  const handleDeleteContent = async (contentId) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await learningContentAPI.deleteLearningContent(contentId);
      toast.success('Content deleted successfully');
      if (selectedCourseForContent) {
        handleManageContent(selectedCourseForContent);
      }
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  const handleContentFormSubmit = async (e) => {
    e.preventDefault();

    // FIX: Check if already loading to prevent duplicate submissions on double-click
    if (contentFormLoading) {
      console.log("Content form submission already in progress, ignoring duplicate submission");
      return;
    }

    if (!contentForm.title || !contentForm.courseId) {
      toast.error('Please fill all required fields');
      return;
    }

    setContentFormLoading(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add basic fields
      formData.append('courseId', contentForm.courseId);
      formData.append('title', contentForm.title);
      formData.append('type', contentForm.type);
      formData.append('description', contentForm.description || '');
      formData.append('duration', contentForm.duration || '');
      formData.append('sequence', Number(contentForm.sequence));

      // Add mode fields
      formData.append('videoMode', contentForm.videoMode);
      formData.append('pdfMode', contentForm.pdfMode);
      formData.append('thumbnailMode', contentForm.thumbnailMode);

      // Handle video
      if (contentForm.type === 'video') {
        if (contentForm.videoMode === 'upload') {
          if (contentForm.videoFile) {
            formData.append('video', contentForm.videoFile);
          } else if (contentForm.videoUrl) {
            formData.append('videoUrl', contentForm.videoUrl);
          }
        } else {
          // URL mode
          formData.append('videoUrl', contentForm.videoUrl || '');
        }
      }

      // Handle PDF
      if (contentForm.type === 'note') {
        if (contentForm.pdfMode === 'upload') {
          if (contentForm.pdfFile) {
            formData.append('pdf', contentForm.pdfFile);
          } else if (contentForm.pdfUrl) {
            formData.append('pdfUrl', contentForm.pdfUrl);
          }
        } else {
          // URL mode
          formData.append('pdfUrl', contentForm.pdfUrl || '');
        }
      }

      // Handle thumbnail
      if (contentForm.thumbnailMode === 'upload') {
        if (contentForm.thumbnailFile) {
          formData.append('thumbnail', contentForm.thumbnailFile);
        } else if (contentForm.thumbnail) {
          formData.append('thumbnail', contentForm.thumbnail);
        }
      } else {
        // URL mode
        formData.append('thumbnail', contentForm.thumbnail || '');
      }

      if (editingContent) {
        await learningContentAPI.updateLearningContent(editingContent._id, formData);
        toast.success('Content updated successfully');
      } else {
        await learningContentAPI.addLearningContent(formData);
        toast.success('Content added successfully');
      }

      setShowContentForm(false);
      if (selectedCourseForContent) {
        handleManageContent(selectedCourseForContent);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save content');
    } finally {
      setContentFormLoading(false);
    }
  };

  const handleContentFormChange = (e) => {
    const { name, value, type } = e.target;
    setContentForm({
      ...contentForm,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  // Testimonial functions
  const fetchTestimonials = async () => {
    try {
      const response = await testimonialAPI.getAllTestimonialsAdmin();
      setTestimonials(response.data.testimonials);
    } catch (error) {
      toast.error('Failed to load testimonials');
    }
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      studentName: '',
      courseName: '',
      designation: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      displayOrder: 0,
      isActive: true,

      // Mode selection
      videoMode: 'upload',
      thumbnailMode: 'upload',

      // File upload fields
      videoFile: null,
      thumbnailFile: null
    });
    setShowTestimonialForm(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      studentName: testimonial.studentName,
      courseName: testimonial.courseName,
      designation: testimonial.designation || '',
      description: testimonial.description || '',
      videoUrl: testimonial.videoUrl,
      thumbnail: testimonial.thumbnail || '',
      displayOrder: testimonial.displayOrder || 0,
      isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,

      // Mode selection based on existing data
      videoMode: testimonial.videoPublicId ? 'upload' : 'url',
      thumbnailMode: testimonial.thumbnailPublicId ? 'upload' : 'url',

      // File upload fields
      videoFile: null,
      thumbnailFile: null
    });
    setShowTestimonialForm(true);
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialAPI.deleteTestimonial(testimonialId);
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleTestimonialFormSubmit = async (e) => {
    e.preventDefault();

    if (testimonialFormLoading) {
      return;
    }

    if (!testimonialForm.studentName || !testimonialForm.courseName) {
      toast.error('Please fill all required fields');
      return;
    }

    setTestimonialFormLoading(true);

    try {
      const formData = new FormData();

      // Add basic fields
      formData.append('studentName', testimonialForm.studentName);
      formData.append('courseName', testimonialForm.courseName);
      formData.append('designation', testimonialForm.designation);
      formData.append('description', testimonialForm.description);
      formData.append('displayOrder', testimonialForm.displayOrder);
      formData.append('isActive', testimonialForm.isActive);

      // Add mode fields
      formData.append('videoMode', testimonialForm.videoMode);
      formData.append('thumbnailMode', testimonialForm.thumbnailMode);

      // Handle video
      if (testimonialForm.videoMode === 'upload') {
        if (testimonialForm.videoFile) {
          formData.append('video', testimonialForm.videoFile);
        } else if (testimonialForm.videoUrl) {
          formData.append('videoUrl', testimonialForm.videoUrl);
        }
      } else {
        // URL mode
        formData.append('videoUrl', testimonialForm.videoUrl || '');
      }

      // Handle thumbnail
      if (testimonialForm.thumbnailMode === 'upload') {
        if (testimonialForm.thumbnailFile) {
          formData.append('thumbnail', testimonialForm.thumbnailFile);
        } else if (testimonialForm.thumbnail) {
          formData.append('thumbnail', testimonialForm.thumbnail);
        }
      } else {
        // URL mode
        formData.append('thumbnail', testimonialForm.thumbnail || '');
      }

      if (editingTestimonial) {
        await testimonialAPI.updateTestimonial(editingTestimonial._id, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await testimonialAPI.createTestimonial(formData);
        toast.success('Testimonial created successfully');
      }

      setShowTestimonialForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Testimonial save error:', error);
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setTestimonialFormLoading(false);
    }
  };

  const handleTestimonialFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialForm({
      ...testimonialForm,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
  };

  const handleTestimonialFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setTestimonialForm({
        ...testimonialForm,
        [name]: files[0]
      });
    }
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
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'course-content', label: 'Course Content', icon: '📖' },
    { id: 'testimonials', label: 'Testimonials', icon: '🎥' }
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
                          onClick={() => handleManageContent(course)}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition text-sm"
                        >
                          Content
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

          {activeTab === 'course-content' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {!selectedCourseForContent ? (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Course</h2>
                  <p className="text-gray-600 mb-6">Choose a course from the Courses tab to manage its learning content.</p>
                  <motion.button
                    onClick={() => setActiveTab('courses')}
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Go to Courses
                  </motion.button>
                </div>
              ) : (
                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedCourseForContent.title}</h2>
                        <p className="text-gray-600">Manage learning content for this course</p>
                      </div>
                      <motion.button
                        onClick={() => setActiveTab('courses')}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                      >
                        ← Back to Courses
                      </motion.button>
                    </div>
                    <motion.button
                      onClick={handleAddContent}
                      whileHover={{ scale: 1.02 }}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      + Add Content
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📹 Videos</h3>
                      <div className="space-y-4">
                        {learningContent.filter(c => c.type === 'video').map((content) => (
                          <motion.div
                            key={content._id}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">{content.title}</h4>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Seq: {content.sequence}
                              </span>
                            </div>
                            {content.thumbnail && (
                              <img
                                src={content.thumbnail}
                                alt={content.title}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                            )}
                            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                            {content.duration && (
                              <p className="text-xs text-gray-500 mb-2">Duration: {content.duration}</p>
                            )}
                            <p className="text-xs text-gray-500 mb-3 truncate">
                              {getVideoProvider(content.videoUrl) === 'youtube' ? 'YouTube' : 
                               getVideoProvider(content.videoUrl) === 'vimeo' ? 'Vimeo' :
                               getVideoProvider(content.videoUrl) === 'drive' ? 'Google Drive' : 
                               getVideoProvider(content.videoUrl) === 'dropbox' ? 'Dropbox' : 'Video'}: {content.videoUrl}
                            </p>
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleEditContent(content)}
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteContent(content._id)}
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                        {learningContent.filter(c => c.type === 'video').length === 0 && (
                          <p className="text-gray-500 text-center py-4">No videos added yet</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">📄 Notes (PDFs)</h3>
                      <div className="space-y-4">
                        {learningContent.filter(c => c.type === 'note').map((content) => (
                          <motion.div
                            key={content._id}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">{content.title}</h4>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                PDF
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                            <a
                              href={content.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline mb-3 block truncate"
                            >
                              {content.pdfUrl}
                            </a>
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleEditContent(content)}
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteContent(content._id)}
                                whileHover={{ scale: 1.05 }}
                                className="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                        {learningContent.filter(c => c.type === 'note').length === 0 && (
                          <p className="text-gray-500 text-center py-4">No notes added yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Video Testimonials</h2>
                  <motion.button
                    onClick={handleAddTestimonial}
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    + Add Testimonial
                  </motion.button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testimonials.map((testimonial) => (
                      <tr key={testimonial._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-800">{testimonial.studentName}</div>
                          {testimonial.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{testimonial.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{testimonial.courseName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{testimonial.designation || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{testimonial.displayOrder}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {testimonial.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => handleEditTestimonial(testimonial)}
                              whileHover={{ scale: 1.05 }}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteTestimonial(testimonial._id)}
                              whileHover={{ scale: 1.05 }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {testimonials.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          No testimonials added yet. Click "Add Testimonial" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                      <label className="block text-gray-700 font-semibold mb-2">Thumbnail Image *</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="thumbnailMode"
                            value="upload"
                            checked={courseForm.thumbnailMode === 'upload'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Upload from Computer</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="thumbnailMode"
                            value="url"
                            checked={courseForm.thumbnailMode === 'url'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Use URL</span>
                        </label>
                      </div>
                      {courseForm.thumbnailMode === 'upload' ? (
                        <>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => handleFileChange('thumbnailFile', e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
                          {courseForm.thumbnailFile && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600">Selected: {courseForm.thumbnailFile.name}</p>
                              <img
                                src={URL.createObjectURL(courseForm.thumbnailFile)}
                                alt="Thumbnail preview"
                                className="w-32 h-32 object-cover rounded mt-2"
                              />
                            </div>
                          )}
                          {!courseForm.thumbnailFile && courseForm.image && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Current: {courseForm.image}</p>
                              <img
                                src={courseForm.image}
                                alt="Current thumbnail"
                                className="w-32 h-32 object-cover rounded mt-2"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="url"
                            name="thumbnailUrl"
                            value={courseForm.thumbnailUrl}
                            onChange={handleCourseFormChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {courseForm.thumbnailUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Preview:</p>
                              <img
                                src={courseForm.thumbnailUrl}
                                alt="URL preview"
                                className="w-32 h-32 object-cover rounded mt-2"
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Banner Image *</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="bannerMode"
                            value="upload"
                            checked={courseForm.bannerMode === 'upload'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Upload from Computer</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="bannerMode"
                            value="url"
                            checked={courseForm.bannerMode === 'url'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Use URL</span>
                        </label>
                      </div>
                      {courseForm.bannerMode === 'upload' ? (
                        <>
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => handleFileChange('bannerFile', e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
                          {courseForm.bannerFile && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600">Selected: {courseForm.bannerFile.name}</p>
                              <img
                                src={URL.createObjectURL(courseForm.bannerFile)}
                                alt="Banner preview"
                                className="w-48 h-24 object-cover rounded mt-2"
                              />
                            </div>
                          )}
                          {!courseForm.bannerFile && courseForm.banner && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Current: {courseForm.banner}</p>
                              <img
                                src={courseForm.banner}
                                alt="Current banner"
                                className="w-48 h-24 object-cover rounded mt-2"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="url"
                            name="bannerUrl"
                            value={courseForm.bannerUrl}
                            onChange={handleCourseFormChange}
                            placeholder="https://example.com/banner.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {courseForm.bannerUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Preview:</p>
                              <img
                                src={courseForm.bannerUrl}
                                alt="URL preview"
                                className="w-48 h-24 object-cover rounded mt-2"
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            </div>
                          )}
                        </>
                      )}
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
                      <label className="block text-gray-700 font-semibold mb-2">Demo Video</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="previewVideoMode"
                            value="upload"
                            checked={courseForm.previewVideoMode === 'upload'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Upload from Computer</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="previewVideoMode"
                            value="url"
                            checked={courseForm.previewVideoMode === 'url'}
                            onChange={handleCourseFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Use URL</span>
                        </label>
                      </div>
                      {courseForm.previewVideoMode === 'upload' ? (
                        <>
                          <input
                            type="file"
                            accept="video/mp4,video/quicktime,video/webm"
                            onChange={(e) => handleFileChange('previewVideoFile', e.target.files[0])}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Max size: 100MB. Formats: MP4, MOV, WebM</p>
                          {courseForm.previewVideoFile && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600">Selected: {courseForm.previewVideoFile.name}</p>
                              <video
                                src={URL.createObjectURL(courseForm.previewVideoFile)}
                                controls
                                className="w-64 h-36 object-cover rounded mt-2"
                              />
                            </div>
                          )}
                          {!courseForm.previewVideoFile && courseForm.demoVideo && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Current: {courseForm.demoVideo}</p>
                              <UniversalVideoPlayer
                                videoUrl={courseForm.demoVideo}
                                className="w-64 h-36 mt-2"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="url"
                            name="previewVideoUrl"
                            value={courseForm.previewVideoUrl}
                            onChange={handleCourseFormChange}
                            placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          {courseForm.previewVideoUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Preview:</p>
                              <UniversalVideoPlayer
                                videoUrl={courseForm.previewVideoUrl}
                                className="w-64 h-36 mt-2"
                              />
                            </div>
                          )}
                        </>
                      )}
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
                      disabled={courseFormLoading}
                      className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {courseFormLoading ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowCourseForm(false)}
                      whileHover={{ scale: 1.02 }}
                      disabled={courseFormLoading}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {showContentForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingContent ? 'Edit Content' : 'Add New Content'}
                  </h2>
                  <button
                    onClick={() => setShowContentForm(false)}
                    className="text-2xl text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleContentFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Content Type *</label>
                    <select
                      name="type"
                      value={contentForm.type}
                      onChange={handleContentFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="video">Video</option>
                      <option value="note">Note (PDF)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={contentForm.title}
                      onChange={handleContentFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  {contentForm.type === 'video' && (
                    <>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Video *</label>
                        <div className="flex gap-4 mb-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="videoMode"
                              value="upload"
                              checked={contentForm.videoMode === 'upload'}
                              onChange={handleContentFormChange}
                              className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-sm text-gray-700">Upload from Computer</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="videoMode"
                              value="url"
                              checked={contentForm.videoMode === 'url'}
                              onChange={handleContentFormChange}
                              className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-sm text-gray-700">Use URL</span>
                          </label>
                        </div>
                        {contentForm.videoMode === 'upload' ? (
                          <>
                            <input
                              type="file"
                              accept="video/mp4,video/quicktime,video/webm"
                              onChange={(e) => setContentForm({ ...contentForm, videoFile: e.target.files[0] })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max size: 100MB. Formats: MP4, MOV, WebM</p>
                            {contentForm.videoFile && (
                              <div className="mt-2">
                                <p className="text-sm text-green-600">Selected: {contentForm.videoFile.name}</p>
                                <video
                                  src={URL.createObjectURL(contentForm.videoFile)}
                                  controls
                                  className="w-64 h-36 object-cover rounded mt-2"
                                />
                              </div>
                            )}
                            {!contentForm.videoFile && contentForm.videoUrl && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Current: {contentForm.videoUrl}</p>
                                <UniversalVideoPlayer
                                  videoUrl={contentForm.videoUrl}
                                  className="w-64 h-36 mt-2"
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              type="url"
                              name="videoUrl"
                              value={contentForm.videoUrl}
                              onChange={handleContentFormChange}
                              placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/file/d/..."
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                              required
                            />
                            <p className="text-xs text-gray-500 mt-1">Supports YouTube and Google Drive video links</p>
                            {contentForm.videoUrl && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Preview:</p>
                                <UniversalVideoPlayer
                                  videoUrl={contentForm.videoUrl}
                                  className="w-64 h-36 mt-2"
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
                        <div className="flex gap-4 mb-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="thumbnailMode"
                              value="upload"
                              checked={contentForm.thumbnailMode === 'upload'}
                              onChange={handleContentFormChange}
                              className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-sm text-gray-700">Upload from Computer</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="thumbnailMode"
                              value="url"
                              checked={contentForm.thumbnailMode === 'url'}
                              onChange={handleContentFormChange}
                              className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-sm text-gray-700">Use URL</span>
                          </label>
                        </div>
                        {contentForm.thumbnailMode === 'upload' ? (
                          <>
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={(e) => setContentForm({ ...contentForm, thumbnailFile: e.target.files[0] })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, WebP</p>
                            {contentForm.thumbnailFile && (
                              <div className="mt-2">
                                <p className="text-sm text-green-600">Selected: {contentForm.thumbnailFile.name}</p>
                                <img
                                  src={URL.createObjectURL(contentForm.thumbnailFile)}
                                  alt="Thumbnail preview"
                                  className="w-32 h-32 object-cover rounded mt-2"
                                />
                              </div>
                            )}
                            {!contentForm.thumbnailFile && contentForm.thumbnail && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Current: {contentForm.thumbnail}</p>
                                <img
                                  src={contentForm.thumbnail}
                                  alt="Current thumbnail"
                                  className="w-32 h-32 object-cover rounded mt-2"
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              type="url"
                              name="thumbnail"
                              value={contentForm.thumbnail}
                              onChange={handleContentFormChange}
                              placeholder="Image URL for video thumbnail"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {contentForm.thumbnail && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Preview:</p>
                                <img
                                  src={contentForm.thumbnail}
                                  alt="URL preview"
                                  className="w-32 h-32 object-cover rounded mt-2"
                                  onError={(e) => e.target.style.display = 'none'}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={contentForm.duration}
                          onChange={handleContentFormChange}
                          placeholder="e.g., 10:30"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </>
                  )}

                  {contentForm.type === 'note' && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">PDF *</label>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pdfMode"
                            value="upload"
                            checked={contentForm.pdfMode === 'upload'}
                            onChange={handleContentFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Upload from Computer</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="pdfMode"
                            value="url"
                            checked={contentForm.pdfMode === 'url'}
                            onChange={handleContentFormChange}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-sm text-gray-700">Use URL</span>
                        </label>
                      </div>
                      {contentForm.pdfMode === 'upload' ? (
                        <>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setContentForm({ ...contentForm, pdfFile: e.target.files[0] })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Max size: 20MB. Format: PDF</p>
                          {contentForm.pdfFile && (
                            <div className="mt-2">
                              <p className="text-sm text-green-600">Selected: {contentForm.pdfFile.name}</p>
                            </div>
                          )}
                          {!contentForm.pdfFile && contentForm.pdfUrl && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Current: {contentForm.pdfUrl}</p>
                              <a
                                href={contentForm.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline"
                              >
                                View PDF
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="url"
                            name="pdfUrl"
                            value={contentForm.pdfUrl}
                            onChange={handleContentFormChange}
                            placeholder="Link to PDF file"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                          />
                          {contentForm.pdfUrl && (
                            <div className="mt-2">
                              <a
                                href={contentForm.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline"
                              >
                                View PDF
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={contentForm.description}
                      onChange={handleContentFormChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Brief description of the content"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sequence Order</label>
                    <input
                      type="number"
                      name="sequence"
                      value={contentForm.sequence}
                      onChange={handleContentFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      disabled={contentFormLoading}
                      className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {contentFormLoading ? 'Saving...' : (editingContent ? 'Update Content' : 'Add Content')}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowContentForm(false)}
                      whileHover={{ scale: 1.02 }}
                      disabled={contentFormLoading}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {showTestimonialForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h2>
                  <button
                    onClick={() => setShowTestimonialForm(false)}
                    className="text-2xl text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleTestimonialFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Student Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={testimonialForm.studentName}
                        onChange={handleTestimonialFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Course Name *</label>
                      <input
                        type="text"
                        name="courseName"
                        value={testimonialForm.courseName}
                        onChange={handleTestimonialFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={testimonialForm.designation}
                        onChange={handleTestimonialFormChange}
                        placeholder="e.g., Software Engineer at Google"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Display Order</label>
                      <input
                        type="number"
                        name="displayOrder"
                        value={testimonialForm.displayOrder}
                        onChange={handleTestimonialFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={testimonialForm.description}
                      onChange={handleTestimonialFormChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Brief description or testimonial text"
                    />
                  </div>

                  {/* Video Section */}
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="videoMode"
                          value="upload"
                          checked={testimonialForm.videoMode === 'upload'}
                          onChange={handleTestimonialFormChange}
                          className="text-purple-600"
                        />
                        <span className="text-gray-700 font-semibold">Upload Video</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="videoMode"
                          value="url"
                          checked={testimonialForm.videoMode === 'url'}
                          onChange={handleTestimonialFormChange}
                          className="text-purple-600"
                        />
                        <span className="text-gray-700 font-semibold">Video URL</span>
                      </label>
                    </div>

                    {testimonialForm.videoMode === 'upload' ? (
                      <div>
                        <input
                          type="file"
                          name="videoFile"
                          accept="video/*"
                          onChange={handleTestimonialFileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload video file (MP4, WebM, etc.)</p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          name="videoUrl"
                          value={testimonialForm.videoUrl}
                          onChange={handleTestimonialFormChange}
                          placeholder="https://www.youtube.com/watch?v=... or direct video URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Supports YouTube, Google Drive, or direct video URLs</p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Section */}
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="thumbnailMode"
                          value="upload"
                          checked={testimonialForm.thumbnailMode === 'upload'}
                          onChange={handleTestimonialFormChange}
                          className="text-purple-600"
                        />
                        <span className="text-gray-700 font-semibold">Upload Thumbnail</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="thumbnailMode"
                          value="url"
                          checked={testimonialForm.thumbnailMode === 'url'}
                          onChange={handleTestimonialFormChange}
                          className="text-purple-600"
                        />
                        <span className="text-gray-700 font-semibold">Thumbnail URL</span>
                      </label>
                    </div>

                    {testimonialForm.thumbnailMode === 'upload' ? (
                      <div>
                        <input
                          type="file"
                          name="thumbnailFile"
                          accept="image/*"
                          onChange={handleTestimonialFileChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Upload thumbnail image (JPG, PNG, WebP)</p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          name="thumbnail"
                          value={testimonialForm.thumbnail}
                          onChange={handleTestimonialFormChange}
                          placeholder="Image URL for video thumbnail"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={testimonialForm.isActive}
                      onChange={handleTestimonialFormChange}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-gray-700">Active (show on website)</label>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      disabled={testimonialFormLoading}
                      className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {testimonialFormLoading ? 'Saving...' : (editingTestimonial ? 'Update Testimonial' : 'Add Testimonial')}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowTestimonialForm(false)}
                      whileHover={{ scale: 1.02 }}
                      disabled={testimonialFormLoading}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
