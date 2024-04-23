const { getModels } = require('../../server');

const addNotification = async (taskId, description) => {
    try {
        const { Task, Notification } = await getModels(); 
        
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        
        
        const notification = await Notification.create({
            Description: description,
            TaskID: taskId
        });

        console.log('Notification added');
        return notification;
    } catch (error) {
        console.error('Error adding notification:', error);
        throw error;
    }
};


module.exports = {
    addNotification
}