const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/authMiddleware');

// Admin login
router.post('/login', adminController.login);

// Admin functionalities
router.get('/students', isAdmin, adminController.getAllStudents);
router.get('/payments', isAdmin, adminController.getAllPayments);
router.get('/allocations', isAdmin, adminController.getAllRoomAllocations);

// Room management
router.post('/rooms/add', isAdmin, adminController.addRoom);
router.put('/rooms/update', isAdmin, adminController.updateRoomStatus);
router.get('/rooms/available', isAdmin, adminController.getAvailableRooms);

module.exports = router;

