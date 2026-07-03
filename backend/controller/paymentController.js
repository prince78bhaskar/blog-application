import { Cashfree } from "cashfree-pg";
import crypto from 'crypto';
import Course from '../model/Course.js';
import User from '../model/User.js';
import Enrollment from '../model/Enrollment.js';
import { generateUsername, generatePassword } from '../utils/generateCredentials.js';
import { sendCredentialsEmail } from '../services/emailService.js';

const cashfree = new Cashfree(Cashfree.SANDBOX, process.env.CASHFREE_CLIENT_ID, process.env.CASHFREE_CLIENT_SECRET);

export const createOrder = async (req, res) => {
  try {
    const { courseId, amount } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const orderRequest = {
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_email: req.body.email || '',
        customer_phone: req.body.mobile || ''
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        notify_url: `${process.env.BACKEND_URL}/api/payment/verify`
      },
      order_note: {
        courseId: courseId
      }
    };

    const order = await cashfree.createOrder(orderRequest);

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
      signature,
      name,
      email,
      mobile,
      courseId
    } = req.body;

    // Verify signature using Cashfree webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_CLIENT_SECRET)
      .update(`${order_id}${payment_id}`)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      const username = generateUsername(name);
      const password = generatePassword();

      user = await User.create({
        name,
        email: email.toLowerCase(),
        mobile,
        username,
        password,
        role: 'student',
        purchasedCourses: [courseId],
        paymentDetails: [{
          courseId,
          paymentId: payment_id,
          orderId: order_id,
          amount: course.price,
          paymentStatus: 'completed'
        }]
      });

      await sendCredentialsEmail(email, username, password, course.title);

      await Enrollment.create({
        userId: user._id,
        courseId,
        paymentId: payment_id,
        orderId: order_id,
        amount: course.price,
        paymentStatus: 'completed'
      });

      await Course.findByIdAndUpdate(courseId, {
        $inc: { enrolledCount: 1 }
      });

      res.status(200).json({
        success: true,
        message: 'Payment verified and account created',
        isNewUser:true,
        username
      });
    } else {
      if (user.purchasedCourses.includes(courseId)) {
        return res.status(400).json({
          success: false,
          message: 'You have already purchased this course'
        });
      }

      user.purchasedCourses.push(courseId);
      user.paymentDetails.push({
        courseId,
        paymentId: payment_id,
        orderId: order_id,
        amount: course.price,
        paymentStatus: 'completed'
      });

      await user.save();

      await Enrollment.create({
        userId: user._id,
        courseId,
        paymentId: payment_id,
        orderId: order_id,
        amount: course.price,
        paymentStatus: 'completed'
      });

      await Course.findByIdAndUpdate(courseId, {
        $inc: { enrolledCount: 1 }
      });

      res.status(200).json({
        success: true,
        message: 'Payment verified and course added to your account',
        isNewUser: false
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
