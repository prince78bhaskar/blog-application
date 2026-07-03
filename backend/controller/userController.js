import User from "../model/User.js";
import Course from "../model/Course.js";
import Enrollment from "../model/Enrollment.js";
import { generateUsername, generatePassword } from '../utils/generateCredentials.js';
import { sendCredentialsEmail } from '../services/emailService.js';

// Register User API (creates account + enrollment + sends credentials)
async function registerUser(req, res) {
  try {
    const { name, email, phone, course } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Try to resolve course as an ID first, otherwise treat as title
    let courseDoc = null;
    try {
      courseDoc = await Course.findById(course);
    } catch (err) {
      // ignore
    }

    if (!courseDoc && course) {
      courseDoc = await Course.findOne({ title: course });
    }

    const courseId = courseDoc ? courseDoc._id : null;

    // Check if same email already enrolled in same course
    const alreadyExists = courseId
      ? await User.findOne({ email: email.toLowerCase(), purchasedCourses: courseId })
      : await User.findOne({ email: email.toLowerCase() });

    if (alreadyExists && courseId && alreadyExists.purchasedCourses && alreadyExists.purchasedCourses.includes(String(courseId))) {
      return res.status(400).json({ success: false, message: 'You have already enrolled in this course.' });
    }

    const username = generateUsername(name);
    const password = generatePassword();

    const newUserData = {
      name,
      email: email.toLowerCase(),
      mobile: phone,
      username,
      password,
      role: 'student'
    };

    if (courseId) {
      newUserData.purchasedCourses = [courseId];
      newUserData.paymentDetails = [{
        courseId,
        paymentId: null,
        orderId: null,
        amount: courseDoc ? courseDoc.price : 0,
        paymentStatus: 'pending'
      }];
    }

    const created = await User.create(newUserData);

    // Create enrollment record if course selected
    if (courseId) {
      await Enrollment.create({
        userId: created._id,
        courseId,
        paymentId: null,
        orderId: null,
        amount: courseDoc ? courseDoc.price : 0,
        paymentStatus: 'pending'
      });

      await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
    }

    // Send credentials email (fire and forget)
    try {
      await sendCredentialsEmail(email, username, password, courseDoc ? courseDoc.title : '');
    } catch (emailErr) {
      console.error('Failed to send credentials email:', emailErr.message || emailErr);
    }

    res.status(201).json({ success: true, message: 'Enrollment Successful', username });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const userController = { registerUser };

export default userController;