import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { courseAPI, paymentAPI } from '../services/api';


const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  // Convert YouTube watch URL to embed URL
  const convertToEmbedUrl = (url) => {
    if (!url) return '';

    // If already an embed URL, return as is
    if (url.includes('embed/')) return url;

    // Extract video ID from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    // If not a YouTube URL, return as is
    return url;
  };

  useEffect(() => {
    // FIX: Moved fetchCourseDetails inside useEffect to prevent duplicate calls
    // Added cleanup flag to prevent duplicate calls in React StrictMode (development only)
    let isMounted = true;

    const fetchCourseDetails = async () => {
      try {
        const response = await courseAPI.getCourseById(courseId);
        if (isMounted) {
          setCourse(response.data.course);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          toast.error('Failed to load course details');
          setLoading(false);
        }
      }
    };

    if (isMounted) {
      fetchCourseDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [courseId]); // Only depend on courseId

  const handleEnrollClick = () => {
    setShowEnrollForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();

    // FIX: Check if already loading to prevent duplicate submissions on double-click
    if (paymentLoading) {
      console.log("Payment already in progress, ignoring duplicate submission");
      return;
    }

    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error('Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error('Invalid mobile number (must be 10 digits)');
      return;
    }

    setPaymentLoading(true);

    try {
      console.log('=== Cashfree SDK Debug ===');
      console.log('1. Creating payment order...');

      const response = await paymentAPI.createOrder({
        courseId,
        amount: course.price,
        email: formData.email,
        mobile: formData.mobile,
        name: formData.name
      });

      console.log('2. Order created successfully:', response.data);
      console.log('3. Order Data:', response.data.order);
      console.log('4. Payment Session ID:', response.data.order.payment_session_id);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create order');
      }

      const newOrderData = response.data.order;
      setOrderData(newOrderData);

      console.log('5. SDK Load Check:', typeof window.Cashfree);

      if (!window.Cashfree) {
        console.error('Cashfree SDK not loaded');
        throw new Error('Cashfree SDK not loaded. Please refresh the page.');
      }

      console.log('6. SDK Version:', window.Cashfree.version ? window.Cashfree.version() : 'Unknown');
      console.log('7. Session ID Format Check:', newOrderData.payment_session_id ? 'Valid' : 'Invalid/Empty');

      const cashfree = window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox'
      });

      console.log('8. SDK Initialized:', cashfree ? 'Success' : 'Failed');

      const checkoutOptions = {
        paymentSessionId: newOrderData.payment_session_id,
        redirectTarget: '_modal'
      };

      console.log('9. Checkout Options:', checkoutOptions);
      console.log('10. Opening checkout modal...');

      cashfree.checkout(checkoutOptions).then((result) => {
        console.log('11. Checkout Result:', result);

        if (result.error) {
          console.error('Checkout Error:', result.error);
          setPaymentLoading(false);
          toast.error(result.error.message || 'Payment failed. Please try again.');
          return;
        }

        if (result.redirect) {
          console.log('User will be redirected to return URL after payment');
          setPaymentLoading(false);
          return;
        }

        if (result.paymentDetails) {
          console.log('Payment completed:', result.paymentDetails);
          setPaymentLoading(false);

          paymentAPI.verifyPayment({
            order_id: newOrderData.order_id,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            courseId
          }).then((verifyResponse) => {
            console.log('Payment verification response:', verifyResponse.data);

            if (verifyResponse.data.success) {
              toast.success(verifyResponse.data.message);
              if (verifyResponse.data.isNewUser) {
                toast.info(`Your username: ${verifyResponse.data.username}`);
              }
              setShowEnrollForm(false);
              navigate('/login');
            } else {
              toast.error(verifyResponse.data.message || 'Payment verification failed');
            }
          }).catch((error) => {
            console.error('Payment verification error:', error);
            toast.error(error.response?.data?.message || 'Payment verification failed');
          });
        }
      }).catch((error) => {
        console.error('Checkout Promise Error:', error);
        setPaymentLoading(false);
        toast.error(error.message || 'Failed to open payment modal');
      });

    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentLoading(false);
      toast.error(error.response?.data?.message || error.message || 'Failed to initiate payment');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-700">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.button
          onClick={() => navigate('/Course')}
          whileHover={{ scale: 1.05 }}
          className="mb-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ← Back to Courses
        </motion.button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={course.banner}
            alt={course.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Instructor</p>
                <p className="font-semibold text-gray-800">{course.instructor}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-gray-800">{course.duration}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-semibold text-gray-800">{course.level}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-semibold text-2xl text-green-600">₹{course.price}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {course.demoVideo && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Demo Video</h2>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={convertToEmbedUrl(course.demoVideo)}
                    className="w-full h-full"
                    allowFullScreen
                    title="Demo Video"
                  />
                </div>
              </div>
            )}

            {course.features && course.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.syllabus && course.syllabus.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Syllabus</h2>
                <div className="space-y-4">
                  {course.syllabus.map((module, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">{module.module}</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.faqs && course.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs</h2>
                <div className="space-y-4">
                  {course.faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <motion.button
                onClick={handleEnrollClick}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
              >
                Enroll Now - ₹{course.price}
              </motion.button>
            </div>
          </div>
        </div>

        {showEnrollForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enroll in {course.title}</h2>
              
              <form onSubmit={handleEnrollSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={paymentLoading}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={paymentLoading}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={paymentLoading}
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    disabled={paymentLoading}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowEnrollForm(false)}
                    whileHover={{ scale: 1.05 }}
                    disabled={paymentLoading}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
