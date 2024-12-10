const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Ensure this path is correct

router.post('/register', studentController.register);
router.post('/login', studentController.login);
router.post('/verifyEmail', studentController.verifyEmail);
router.post('/pay', studentController.pay);
router.post('/allocateRoom', studentController.allocateRoom);

module.exports = router;

