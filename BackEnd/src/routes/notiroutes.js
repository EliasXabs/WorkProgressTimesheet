const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationcontroller');

router.post('/addnoti', notificationController.createNotification);
router.delete('/deletenoti/:notificationId', notificationController.removeNotification);

module.exports = router;