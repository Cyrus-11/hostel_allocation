const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Payment, RoomAllocation } = require('../models/db');
const { Op } = require('sequelize');
const { sendVerificationEmail } = require('../utils/emailService');
const { sendPasswordResetEmail } = require('../utils/emailService');


// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Helper function to generate random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// Student Registration - POST /api/students/register
exports.register = async (req, res) => {
  const {
    matric_no,
    surname,
    firstname,
    othername,
    gender,
    college,
    department,
    level,
    session,
    phone,
    email,
    password,
    confirm_password
  } = req.body;

  console.log('Received data:', req.body)

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingStudent = await Student.findOne({
      where: {
        [Op.or]: [{ email }, { phone }, { matric_no }]
      }
    });

    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    const newStudent = await Student.create({
      matric_no,
      surname,
      firstname,
      othername,
      gender,
      college,
      department,
      level,
      session,
      phone,
      email,
      password: hashedPassword,
      verification_code: verificationCode
    });

    // **Send the verification email**
    await sendVerificationEmail(email, verificationCode);

    return res.status(201).json({ success: true, message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};

// Student Login - POST /api/students/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // 2. Find student by email
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 3. Check if account is activated
    if (student.status !== 'active') {
      return res.status(403).json({ message: 'Account not activated. Please verify your email.' });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 5. Generate JWT token
    const token = jwt.sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }  // Expiry from .env or default 1h
    );

    // 6. Send response (exclude sensitive info)
    const { password: _, ...studentData } = student.toJSON();  // Remove password from response

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      student: studentData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// Email Verification - POST /api/students/verify-email
exports.verifyEmail = async (req, res) => {
  const { verification_code } = req.body;  // Only send the code

  try {
    // Find the student using the verification code
    const student = await Student.findOne({ where: { verification_code } });

    if (!student) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Check if the verification code is expired (5 minutes = 300000ms)
    const codeCreatedAt = new Date(student.verification_code_created_at);
    const currentTime = new Date();
    const timeDifference = currentTime - codeCreatedAt;

    if (timeDifference > 300000) {  // 5 minutes in milliseconds
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Activate student account and clear the code
    student.status = 'active';
    student.verification_code = null;
    await student.save();

    return res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error verifying email', error: error.message });
  }
};



// Password Reset Request - POST /api/students/reset-password
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ where: { email } });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const resetToken = jwt.sign(
      { id: student.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Generate reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email with reset link
    await sendPasswordResetEmail(email, resetLink);

    return res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (error) {
    return res.status(500).json({ message: 'Error requesting password reset', error: error.message });
  }
};

// Update Password - POST /api/students/update-password
exports.updatePassword = async (req, res) => {
  const { token, new_password, confirm_password } = req.body;

  try {
    // Validate new passwords match
    if (new_password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findByPk(decoded.id);

    if (!student) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    student.password = hashedPassword;
    await student.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

// Get Student Profile - GET /api/students/profile
exports.getProfile = async (req, res) => {
  try {
    // Fetch the student using the ID from the authenticated user (req.user.id)
    const student = await Student.findByPk(req.user.id);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
        student: null
      });
    }

    // Remove sensitive information (password) from the response
    const { password, ...studentData } = student.toJSON();

    // Send a successful response with the student profile, formatted for the frontend
    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      student: {
        surname: studentData.surname,
        firstname: studentData.firstname,
        othername: studentData.othername,
        email: studentData.email,
        phone: studentData.phone,
        gender: studentData.gender,
        college: studentData.college,
        department: studentData.department,
        level: studentData.level,
        session: studentData.session,
        status: studentData.status
      }
    });
  } catch (error) {
    // Handle errors that occur during the profile retrieval
    return res.status(500).json({
      success: false,
      message: 'Error retrieving profile',
      error: error.message
    });
  }
};



// Update Student Profile - PUT /api/students/profile
exports.updateProfile = async (req, res) => {
  const { phone, department, level } = req.body;

  try {
    const student = await Student.findByPk(req.user.id);

    student.phone = phone || student.phone;
    student.department = department || student.department;
    student.level = level || student.level;

    await student.save();
    return res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Release Room - POST /api/students/release-room
exports.releaseRoom = async (req, res) => {
  try {
    const room = await RoomAllocation.findOne({ where: { student_id: req.user.id } });

    if (!room) {
      return res.status(404).json({ message: 'Room allocation not found' });
    }

    room.status = 'available';
    room.student_id = null;
    await room.save();

    return res.status(200).json({ message: 'Room released successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error releasing room', error: error.message });
  }
};
