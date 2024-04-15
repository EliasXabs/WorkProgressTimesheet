const express = require('express');
const router = express.Router();
const authController = require('../controller/authcontroller');

// POST Login endpoint
router.post('/login', authController.login);

router.post('/createuser', authController.CreateAccount);

module.exports = router;