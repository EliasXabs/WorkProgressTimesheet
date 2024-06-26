const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

//POST Login endpoint
router.post('/CreateTask', taskController.create);
router.patch('/UpdateTask/:taskid', taskController.update);
router.get('/GetAllTask', taskController.getAll);
router.delete('/DeleteTask/:taskid', taskController.delete);
router.get('/three-day-window', taskController.getTasksForSpecifiedWindow);
router.get('/getByUID/:userId', taskController.getTaskByUID);
router.get('/getByTID/:taskId', taskController.getTaskByTID);

module.exports = router;