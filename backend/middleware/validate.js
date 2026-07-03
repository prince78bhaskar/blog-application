export const validateEnrollment = (req, res, next) => {
  const { name, email, mobile, courseId } = req.body;

  if (!name || !email || !mobile || !courseId) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid mobile number (must be 10 digits)'
    });
  }

  next();
};

// export const validateLogin = (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({
//       success: false,
//       message: 'Username and password are required'
//     });
//   }

//   next();
// };
