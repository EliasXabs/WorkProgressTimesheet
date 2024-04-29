// taskController.js

// Import the task query functions from the taskQueries module
const { createTask, getAllTasks, updateTask, deleteTask, getTasksByUserIdAndDateRange, getTasksByUserIdSortedByDeadline, getTaskById } = require('../model/queries/taskQueries');

    // Create a new task
    exports.create= async (req, res) => {
        try {
            const { pid, title, description, deadline, uid, priority, tstatus} = req.body;
            const newTask = await createTask(pid, title, description,deadline,uid,priority,tstatus);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Retrieve all tasks
    exports.getAll= async (req, res) => {
        try {
            const tasks = await getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a task
    exports.update= async(req, res) => {
    try {
      const taskId = req.params;
      const id = parseInt(taskId.taskid);
      console.log("Task ID:", id);
      const updates = req.body;
      const updatedTask = await updateTask(id, updates);
  
      if (updatedTask) {
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
      } else {
        res.status(404).send({ message: 'Task not found' });
      }
    } catch (error) {
      console.error('Error updating Task:', error.message);
      res.status(500).send({ error: error.message });
    }
  }

    // Delete a task
    exports.delete= async (req, res) => {
        try {
            const { taskid } = req.params;
            console.log("Task ID:", taskid);
            const deleted = await deleteTask(taskid);
            if (!deleted) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(204).json({"message": "Task deleted successfully"});  // No content to return after deletion
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    exports.getTasksForSpecifiedWindow = async (req, res) => {
        const userId = req.headers['user-id']; // Assumes user ID is sent in headers
        const { startDate, endDate } = req.query; // Assumes dates are provided as query parameters
        
        console.log("Received dates:", startDate, endDate);
        console.log("Received userId:", userId);

        try {
            const tasks = await getTasksByUserIdAndDateRange(userId, startDate, endDate);
            console.log("Tasks fetched:", tasks);
            const tasksByDate = [];
            let currentDate = new Date(startDate);
    
            while (currentDate <= new Date(endDate)) {
                tasksByDate.push({
                    date: currentDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
                    tasks: tasks.filter(task => 
                        new Date(task.Deadline).toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]
                    )
                });
                currentDate.setDate(currentDate.getDate() + 1); // Increment day by 1
            }
    
            res.json(tasksByDate);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).send({ message: 'Error fetching tasks' });
        }
    };

    exports.getTaskByUID = async (req, res) => {
        try {
          const userId = parseInt(req.params.userId, 10);
          if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
          }
          const tasks = await getTasksByUserIdSortedByDeadline(userId);
          res.json(tasks);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    };

    exports.getTaskByTID = async (req, res) => {
        try {
            const taskId = req.params.taskId; // Get the task ID from the URL parameters
            if (isNaN(taskId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
              }
            
            const task = await getTaskById(taskId);
    
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            res.json(task); // Send the task data as JSON
        } catch (error) {
            console.error('Failed to fetch task:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };