const { Student, Payment, RoomAllocation } = require('../models');  // Sequelize models for Students, Payments, and Room Allocations
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Login - POST /api/admin/login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is 'admin' (this can be expanded later to use a database of admins)
    if (username !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Simulating admin password for simplicity
    const storedPassword = 'adminpassword';  // This should ideally be hashed in a real application

    // Check if password is correct
    const passwordMatch = bcrypt.compareSync(password, storedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create a JWT token for the admin session
    const token = jwt.sign({ username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

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
