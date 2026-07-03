import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
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

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await courseAPI.getCourseById(courseId);
      setCourse(response.data.course);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load course details');
      setLoading(false);
    }
  };

  const handleEnrollClick = () => {
    setShowEnrollForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    
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

    try {
      const response = await paymentAPI.createOrder({
        courseId,
        amount: course.price,
        email: formData.email,
        mobile: formData.mobile
      });

      const orderData = response.data.order;

      const cashfree = new window.Cashfree(import.meta.env.VITE_CASHFREE_CLIENT_ID);

      const checkoutOptions = {
        orderToken: orderData.order_token,
        orderAmount: orderData.order_amount,
        orderId: orderData.order_id,
        customerDetails: {
          customerId: orderData.customer_details.customer_id,
          customerEmail: formData.email,
          customerPhone: formData.mobile,
          customerName: formData.name
        },
        theme: {
          color: '#2563eb'
        },
        onSuccess: async (data) => {
          try {
            const verifyResponse = await paymentAPI.verifyPayment({
              order_id: data.orderId,
              payment_id: data.paymentId,
              signature: data.signature,
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile,
              courseId
            });

            if (verifyResponse.data.success) {
              toast.success(verifyResponse.data.message);
              if (verifyResponse.data.isNewUser) {
                toast.info(`Your username: ${verifyResponse.data.username}`);
              }
              setShowEnrollForm(false);
              navigate('/login');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        onFailure: (data) => {
          toast.error('Payment failed. Please try again.');
        },
        style: {
          base: {
            backgroundColor: '#ffffff',
            color: '#2563eb',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased'
          }
        }
      };

      cashfree.checkout(checkoutOptions);
    } catch (error) {
      toast.error('Failed to initiate payment');
      console.error('Payment error:', error);
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
      <Navbar />
      
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
                    src={course.demoVideo}
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
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
                  >
                    Proceed to Payment
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowEnrollForm(false)}
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
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
