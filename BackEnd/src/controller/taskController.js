// taskController.js

// Import the task query functions from the taskQueries module
const { createTask, getAllTasks, updateTask, deleteTask } = require('../model/queries/taskQueries');

    // Create a new task
    exports.create= async (req, res) => {
        try {
            const { pid, description, deadline, uid, priority, tstatus} = req.body;
            const newTask = await createTask(pid,description,deadline,uid,priority,tstatus);
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
