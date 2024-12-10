const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student, Payment, RoomAllocation } = require('../models');  // Sequelize models
const { Op } = require('sequelize');


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

  try {
    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if student already exists by email or phone
    const existingStudent = await Student.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });

    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student record
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
    });

    return res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};

// Student Login - POST /api/students/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ where: { email } });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: student.id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Email Verification (Account Activation) - POST /api/students/verify-email
exports.verifyEmail = async (req, res) => {
  const { verification_code } = req.body;

  try {
    // This is a mock-up: In reality, the verification code would be sent via email
    const student = await Student.findOne({ where: { verification_code } });

    if (!student) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Mark the student as activated
    student.status = 'active';
    await student.save();

    return res.status(200).json({ message: 'Email verified and account activated' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying email', error: error.message });
  }
};

// Make Payment for Hostel Fees - POST /api/students/pay
exports.pay = async (req, res) => {
  const { payment_code } = req.body;

  try {
    // Simulating payment verification using a mock 6-digit payment code
    const validPaymentCode = '123456';  // This should be generated dynamically and stored

    if (payment_code !== validPaymentCode) {
      return res.status(400).json({ message: 'Invalid payment code' });
    }

    // Create payment record
    const payment = await Payment.create({
      student_id: req.user.id,  // Assumes JWT token is used for authentication
      payment_type: 'hostel',
      payment_status: 'paid',
      payment_code: validPaymentCode
    });

    return res.status(200).json({ message: 'Payment successful', payment });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// Allocate Room - POST /api/students/allocate-room
exports.allocateRoom = async (req, res) => {
  const { hostel, room_number } = req.body;

  try {
    // Check if the room is available
    const room = await RoomAllocation.findOne({ where: { room_number, hostel, status: 'available' } });

    if (!room) {
      return res.status(404).json({ message: 'Room not available' });
    }

    // Allocate room to the student
    room.status = 'occupied';
    room.student_id = req.user.id;  // Assumes JWT token is used for authentication
    await room.save();

    return res.status(200).json({ message: 'Room allocated successfully', room });
  } catch (error) {
    return res.status(500).json({ message: 'Error allocating room', error: error.message });
  }
};

// Get All Available Rooms for Hostel - GET /api/students/rooms/available
exports.getAvailableRooms = async (req, res) => {
  const { hostel } = req.query;

  try {
    const rooms = await RoomAllocation.findAll({
      where: { hostel, status: 'available' }
    });

    return res.status(200).json({ availableRooms: rooms });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching available rooms', error: error.message });
  }
};

  