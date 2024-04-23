const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationcontroller');

router.post('/addnoti', notificationController.createNotification);

module.exports = router;