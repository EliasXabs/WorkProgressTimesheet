const { getModels } = require('../../server');
const { Op } = require('sequelize');
const createTask = async (pid, title, description,deadline,uid,priority,tstatus) => {
  try { 
    const { Task } = getModels();
    console.log("Building Task ...");
    const task = Task.build({
      TaskProjectID : pid,
      TaskTitle : title,
      TaskDescription : description,
      CreatedAt : new Date(),
      Deadline : deadline,
      UserID : uid,
      Priority : priority,
      TaskStatus : tstatus
    });
    console.log("Task built name", task.TaskID);
    console.log("Saving Task");
    await task.save();
    console.log("Task Saved to the database");
    return true;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async () => {
  try {
    const { Task } = getModels();
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, updates) => {
  try {
    const { Task } = await getModels();
    const task = await Task.findByPk(taskId);

    if (!task) {
      throw new Error(`Task with ID ${taskId} not found`);
    }

    // Update the fields if they exist in the updates object
    if (updates.TaskProjectID !== undefined) {
      task.TaskProjectID = updates.TaskProjectID;
    }
    if (updates.TaskDescription !== undefined) {
      task.TaskDescription = updates.TaskDescription;
    }
    if (updates.Deadline !== undefined) {
      task.Deadline = updates.Deadline;
    }
    if (updates.UserID !== undefined) {
      task.UserID = updates.UserID;
    }
    if (updates.Priority !== undefined) {
      task.Priority = updates.Priority;
    }
    if (updates.TaskStatus !== undefined) {
      task.TaskStatus = updates.TaskStatus;
    }

    await task.save();
    console.log('Task updated');

    return task;
  } catch (error) {
    console.error('Error updating Task:', error);
    throw error;
  }
};



const deleteTask = async (id) => {
  try {
    const { Task } = getModels();
    const task = await Task.findByPk(id);
    if (!task) {
      return false;
    }
    task.destroy();
    return {"message": "Task deleted successfully"};
  } catch (error) {
    throw error;
  }
};

const getTasksByUserIdAndDateRange = async (userId, startDate, endDate) => {
  const { Task } = getModels();
  return await Task.findAll({
      where: {
          UserID: userId,
          Deadline: {
              [Op.between]: [startDate, endDate]
          }
      },
      order: [['Deadline', 'ASC']] // Orders tasks by deadline
  });
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTasksByUserIdAndDateRange
};
