const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Ensure this path is correct
const { verifyToken } = require('../middlewares/authMiddleware')

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.post('/verifyEmail', studentController.verifyEmail);
router.post('/reset-password', studentController.requestPasswordReset);
router.post('/update-password', studentController.updatePassword);
router.get('/profile', verifyToken, studentController.getProfile);
router.put('/profile', studentController.updateProfile);
router.post('/release-room', studentController.releaseRoom);

module.exports = router;

 