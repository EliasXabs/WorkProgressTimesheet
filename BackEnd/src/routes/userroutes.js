const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

// POST Login endpoint
router.delete('/delete/:Username', userController.removeUser);
router.get('/getall', userController.fetchAllUsers);

module.exports = router;