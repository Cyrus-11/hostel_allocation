const { Student, Payment, RoomAllocation, Admin } = require('../models');  // Sequelize models for Students, Payments, and Room Allocations
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Admin Creation - POST /api/admin/create
exports.createAdmin = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  try {
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token for the admin
    const token = jwt.sign({ id: newAdmin.id, username: newAdmin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin, token });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};

// Admin Login - POST /api/admin/login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create a JWT token for the admin session
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in admin', error: error.message });
  }
};

// Get all students - GET /api/admin/students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving students', error: error.message });
  }
};

// Get all payments - GET /api/admin/payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving payments', error: error.message });
  }
};

// Get all room allocations - GET /api/admin/allocations
exports.getAllRoomAllocations = async (req, res) => {
  try {
    const allocations = await RoomAllocation.findAll();
    return res.status(200).json(allocations);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving room allocations', error: error.message });
  }
};

// Add a new room - POST /api/admin/rooms/add
exports.addRoom = async (req, res) => {
  const { hostel, room_number, gender, status } = req.body;

  try {
    const newRoom = await RoomAllocation.create({
      hostel,
      room_number,
      gender,
      status
    });

    return res.status(201).json({ message: 'Room added successfully', room: newRoom });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding room', error: error.message });
  }
};

// Update room status - PUT /api/admin/rooms/update
exports.updateRoomStatus = async (req, res) => {
  const { room_number, hostel, status } = req.body;

  try {
    const room = await RoomAllocation.findOne({ where: { room_number, hostel } });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.status = status;
    await room.save();

    return res.status(200).json({ message: 'Room status updated', room });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating room status', error: error.message });
  }
};

// Get available rooms - GET /api/admin/rooms/available
exports.getAvailableRooms = async (req, res) => {
  const { hostel } = req.query;

  try {
    const rooms = await RoomAllocation.findAll({
      where: { hostel, status: 'available' }
    });

    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving available rooms', error: error.message });
  }
};
