import { Cashfree } from "cashfree-pg";
import Course from '../model/Course.js';
import User from '../model/User.js';
import Enrollment from '../model/Enrollment.js';
import { generateUsername, generatePassword } from '../utils/generateCredentials.js';
import { sendCredentialsEmail } from '../services/emailService.js';

// Validate environment variables
const validateCashfreeConfig = () => {
  if (!process.env.CASHFREE_CLIENT_ID) {
    throw new Error('CASHFREE_CLIENT_ID is not configured in environment variables');
  }
  if (!process.env.CASHFREE_CLIENT_SECRET) {
    throw new Error('CASHFREE_CLIENT_SECRET is not configured in environment variables');
  }
  if (!process.env.CASHFREE_ENV) {
    throw new Error('CASHFREE_ENV is not configured in environment variables');
  }
};

// Configure Cashfree with latest SDK (v4.0.0 uses static methods)
const configureCashfree = () => {
  Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
  Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
  Cashfree.XEnvironment = process.env.CASHFREE_ENV === 'PRODUCTION' ? Cashfree.PRODUCTION : Cashfree.SANDBOX;
  Cashfree.XApiVersion = '2023-08-01';
};

/**
 * Create Order - Creates a payment order using Cashfree PG SDK
 * @route POST /api/payment/create-order
 */
export const createOrder = async (req, res) => {
  try {
    console.log('========== CREATE ORDER REQUEST ==========');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Log environment variables (without exposing secrets)
    console.log('Environment check:');
    console.log('  CASHFREE_CLIENT_ID exists:', !!process.env.CASHFREE_CLIENT_ID);
    console.log('  CASHFREE_CLIENT_SECRET exists:', !!process.env.CASHFREE_CLIENT_SECRET);
    console.log('  CASHFREE_ENV:', process.env.CASHFREE_ENV);
    console.log('  FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('  BACKEND_URL:', process.env.BACKEND_URL);

    // Validate Cashfree configuration
    console.log('Validating Cashfree configuration...');
    validateCashfreeConfig();
    console.log('Cashfree configuration validated successfully');

    // Configure Cashfree SDK
    console.log('Configuring Cashfree SDK...');
    configureCashfree();
    console.log('Cashfree SDK configured successfully');

    const { courseId, amount, email, mobile, name } = req.body;
    console.log('Extracted parameters:');
    console.log('  courseId:', courseId);
    console.log('  amount:', amount);
    console.log('  email:', email);
    console.log('  mobile:', mobile);
    console.log('  name:', name);

    // Validate required fields
    if (!courseId) {
      console.log('Validation failed: Course ID is required');
      return res.status(400).json({
        success: false,
        message: 'Course ID is required'
      });
    }

    if (!amount || amount <= 0) {
      console.log('Validation failed: Invalid amount');
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    // Fetch course details
    console.log('Fetching course details for courseId:', courseId);
    const course = await Course.findById(courseId);
    console.log('Course found:', !!course);

    if (!course) {
      console.log('Validation failed: Course not found');
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    console.log('Course details:');
    console.log('  title:', course.title);
    console.log('  price:', course.price);
    console.log('  amount from request:', amount);

    // Validate amount matches course price
    if (amount !== course.price) {
      console.log('Validation failed: Amount mismatch');
      return res.status(400).json({
        success: false,
        message: 'Amount does not match course price'
      });
    }

    // Generate unique customer ID
    const uniqueCustomerId = `customer_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    console.log('Generated customer ID:', uniqueCustomerId);

    // Create order request with latest Cashfree API structure
    const orderRequest = {
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: uniqueCustomerId,
        customer_email: email || '',
        customer_phone: mobile || '',
        customer_name: name || ''
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        notify_url: `${process.env.BACKEND_URL}/api/payment/webhook`
      },
      order_note: `Course enrollment: ${course.title}`,
      order_tags: {
        courseId: courseId.toString()
      }
    };

    console.log('Creating order with request:', JSON.stringify(orderRequest, null, 2));
    console.log('Calling Cashfree.PGCreateOrder...');

    // Create order using Cashfree SDK static method (v4.0.0)
    // The SDK expects (x_api_version, CreateOrderRequest)
    const order = await Cashfree.PGCreateOrder('2023-08-01', orderRequest);

    console.log('========== CASHFREE RESPONSE ==========');
    console.log('Order created successfully');
    console.log('Full response object keys:', Object.keys(order));
    console.log('Response data keys:', order.data ? Object.keys(order.data) : 'No data property');

    // The SDK returns an Axios response object, actual data is in .data property
    const orderData = order.data;

    console.log('Order ID:', orderData.order_id);
    console.log('Order Token:', orderData.order_token ? 'Present' : 'Missing');
    console.log('Order Amount:', orderData.order_amount);
    console.log('==========================================');

   res.status(200).json({
  success: true,
  message: 'Order created successfully',
  order: {
    order_id: orderData.order_id,
    payment_session_id: orderData.payment_session_id, // 👈 Add this
    cf_order_id: orderData.cf_order_id,
    order_token: orderData.order_token, // agar available ho
    order_amount: orderData.order_amount,
    order_currency: orderData.order_currency,
    customer_details: orderData.customer_details,
    order_status: orderData.order_status
  }
});
  } catch (error) {
    console.error('========== CREATE ORDER ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('==========================================');

    // Handle specific Cashfree errors
    if (error.message.includes('Product is not activated')) {
      return res.status(400).json({
        success: false,
        message: 'Cashfree payment gateway is not activated. Please contact support.'
      });
    }

    if (error.message.includes('Invalid API credentials')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Cashfree API credentials. Please check your configuration.'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order',
      stack: error.stack
    });
  }
};

/**
 * Fetch Order - Fetches order details from Cashfree
 * @route GET /api/payment/order/:orderId
 */
export const fetchOrder = async (req, res) => {
  try {
    console.log('========== FETCH ORDER REQUEST ==========');
    console.log('Order ID:', req.params.orderId);

    validateCashfreeConfig();
    configureCashfree();

    const { orderId } = req.params;

    const order = await Cashfree.PGFetchOrder('2023-08-01', orderId);

    // SDK returns Axios response, actual data is in .data property
    const orderData = order.data;

    console.log('Order fetched successfully');

    res.status(200).json({
      success: true,
      order: orderData
    });
  } catch (error) {
    console.error('========== FETCH ORDER ERROR ==========');
    console.error('Error:', error.message);

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order details'
    });
  }
};

/**
 * Verify Payment - Verifies payment status by fetching from Cashfree
 * @route POST /api/payment/verify
 */
export const verifyPayment = async (req, res) => {
  try {
    console.log('========== VERIFY PAYMENT REQUEST ==========');
    console.log('Request body:', req.body);

    validateCashfreeConfig();
    configureCashfree();

    const { order_id, name, email, mobile, courseId } = req.body;

    if (!order_id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Fetch order details from Cashfree to verify payment status
    const orderResponse = await Cashfree.PGFetchOrder('2023-08-01', order_id);

    // SDK returns Axios response, actual data is in .data property
    const orderDetails = orderResponse.data;

    console.log('Order details from Cashfree:');
    console.log('  Order Status:', orderDetails.order_status);
    console.log('  Order Amount:', orderDetails.order_amount);

    // Check if payment is successful
    if (orderDetails.order_status !== 'PAID') {
      return res.status(400).json({
        success: false,
        message: `Payment not successful. Current status: ${orderDetails.order_status}`
      });
    }

    // Extract courseId from order tags if not provided
    const finalCourseId = courseId || (orderDetails.order_tags && orderDetails.order_tags.courseId);

    if (!finalCourseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID not found in order'
      });
    }

    // Fetch course details
    const course = await Course.findById(finalCourseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('Creating new user for enrollment');

      const username = generateUsername(name);
      const password = generatePassword();

      user = await User.create({
        name,
        email: email.toLowerCase(),
        mobile,
        username,
        password,
        role: 'student',
        purchasedCourses: [finalCourseId],
        paymentDetails: [{
          courseId: finalCourseId,
          paymentId: orderDetails.payment_id || order_id,
          orderId: order_id,
          amount: orderDetails.order_amount,
          paymentStatus: 'completed'
        }]
      });

      // Send credentials email
      try {
        await sendCredentialsEmail(email, username, password, course.title);
        console.log('Credentials email sent successfully');
      } catch (emailError) {
        console.error('Failed to send credentials email:', emailError);
        // Continue with enrollment even if email fails
      }

      // Create enrollment record
      await Enrollment.create({
        userId: user._id,
        courseId: finalCourseId,
        paymentId: orderDetails.payment_id || order_id,
        orderId: order_id,
        amount: orderDetails.order_amount,
        paymentStatus: 'completed'
      });

      // Update course enrolled count
      await Course.findByIdAndUpdate(finalCourseId, {
        $inc: { enrolledCount: 1 }
      });

      console.log('New user created and enrolled successfully');

      res.status(200).json({
        success: true,
        message: 'Payment verified and account created successfully',
        isNewUser: true,
        username
      });
    } else {
      console.log('Existing user found, adding course to account');

      // Check if user already purchased this course
      if (user.purchasedCourses.includes(finalCourseId)) {
        return res.status(400).json({
          success: false,
          message: 'You have already purchased this course'
        });
      }

      // Add course to user's purchased courses
      user.purchasedCourses.push(finalCourseId);
      user.paymentDetails.push({
        courseId: finalCourseId,
        paymentId: orderDetails.payment_id || order_id,
        orderId: order_id,
        amount: orderDetails.order_amount,
        paymentStatus: 'completed'
      });

      await user.save();

      // Create enrollment record
      await Enrollment.create({
        userId: user._id,
        courseId: finalCourseId,
        paymentId: orderDetails.payment_id || order_id,
        orderId: order_id,
        amount: orderDetails.order_amount,
        paymentStatus: 'completed'
      });

      // Update course enrolled count
      await Course.findByIdAndUpdate(finalCourseId, {
        $inc: { enrolledCount: 1 }
      });

      console.log('Existing user enrolled successfully');

      res.status(200).json({
        success: true,
        message: 'Payment verified and course added to your account',
        isNewUser: false
      });
    }
  } catch (error) {
    console.error('========== VERIFY PAYMENT ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed'
    });
  }
};

/**
 * Webhook Handler - Handles Cashfree webhook notifications
 * @route POST /api/payment/webhook
 */
export const handleWebhook = async (req, res) => {
  try {
    console.log('========== CASHFREE WEBHOOK RECEIVED ==========');
    console.log('Webhook data:', JSON.stringify(req.body, null, 2));

    const { data } = req.body;

    // Verify webhook signature (optional but recommended)
    // For now, we'll process the webhook without signature verification
    // In production, you should verify the signature using Cashfree's webhook secret

    const { order_id, order_status, payment_id, order_amount, order_tags } = data;

    if (order_status === 'PAID') {
      console.log('Payment successful via webhook, processing enrollment');

      // Extract courseId from order tags
      const courseId = order_tags?.courseId;

      if (!courseId) {
        console.error('Course ID not found in webhook order tags');
        return res.status(400).json({ success: false, message: 'Course ID missing' });
      }

      // Fetch course details
      const course = await Course.findById(courseId);

      if (!course) {
        console.error('Course not found in webhook processing');
        return res.status(404).json({ success: false, message: 'Course not found' });
      }

      // Extract customer details from webhook data
      const customerDetails = data.customer_details || {};
      const email = customerDetails.customer_email;
      const mobile = customerDetails.customer_phone;
      const name = customerDetails.customer_name;

      if (!email) {
        console.error('Email not found in webhook data');
        return res.status(400).json({ success: false, message: 'Email missing' });
      }

      // Find or create user
      let user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        console.log('Creating new user via webhook');

        const username = generateUsername(name);
        const password = generatePassword();

        user = await User.create({
          name: name || 'Student',
          email: email.toLowerCase(),
          mobile: mobile || '',
          username,
          password,
          role: 'student',
          purchasedCourses: [courseId],
          paymentDetails: [{
            courseId,
            paymentId: payment_id || order_id,
            orderId: order_id,
            amount: order_amount,
            paymentStatus: 'completed'
          }]
        });

        // Send credentials email
        try {
          await sendCredentialsEmail(email, username, password, course.title);
          console.log('Credentials email sent via webhook');
        } catch (emailError) {
          console.error('Failed to send credentials email via webhook:', emailError);
        }

        // Create enrollment record
        await Enrollment.create({
          userId: user._id,
          courseId,
          paymentId: payment_id || order_id,
          orderId: order_id,
          amount: order_amount,
          paymentStatus: 'completed'
        });

        // Update course enrolled count
        await Course.findByIdAndUpdate(courseId, {
          $inc: { enrolledCount: 1 }
        });

        console.log('New user created via webhook');
      } else {
        console.log('Existing user found via webhook');

        if (!user.purchasedCourses.includes(courseId)) {
          user.purchasedCourses.push(courseId);
          user.paymentDetails.push({
            courseId,
            paymentId: payment_id || order_id,
            orderId: order_id,
            amount: order_amount,
            paymentStatus: 'completed'
          });

          await user.save();

          // Create enrollment record
          await Enrollment.create({
            userId: user._id,
            courseId,
            paymentId: payment_id || order_id,
            orderId: order_id,
            amount: order_amount,
            paymentStatus: 'completed'
          });

          // Update course enrolled count
          await Course.findByIdAndUpdate(courseId, {
            $inc: { enrolledCount: 1 }
          });

          console.log('Existing user enrolled via webhook');
        }
      }

      console.log('Webhook processed successfully');
    }

    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('========== WEBHOOK ERROR ==========');
    console.error('Error:', error.message);
    console.error('Error stack:', error.stack);

    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
};
