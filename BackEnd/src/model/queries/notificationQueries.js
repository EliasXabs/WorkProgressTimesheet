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

const deleteNotification = async (notificationId) => {
    try {
        const { Notification } = await getModels();

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            console.log(`Notification with ID ${notificationId} not found`);
            return;
        }

        await notification.destroy();
        console.log('Notification deleted');
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};


module.exports = {
    addNotification,
    deleteNotification
}