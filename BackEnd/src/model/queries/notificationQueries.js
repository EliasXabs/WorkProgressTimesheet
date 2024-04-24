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

const editNotification = async (notificationId, updates) => {
    try {
        const { Notification } = await getModels();
        
        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            throw new Error(`Notification with ID ${notificationId} not found`);
        }

        // Update the fields if they exist in the updates object
        if (updates.TaskID) {
            notification.TaskID = updates.TaskID;
        }
        if (updates.Description) {
            notification.Description = updates.Description;
        }

        await notification.save();
        console.log('Notification updated');

        return notification;
    } catch (error) {
        console.error('Error updating notification:', error);
        throw error;
    }
};

const fetchNotificationsByUserId = async (userId) => {
    const { Notification, Task, Project } = await getModels();
    return await Notification.findAll({
        include: [{
            model: Task,
            required: true,
            include: [{
                model: Project,
                required: true
            }],
            where: { UserID: userId }
        }],
        attributes: ['NotID', 'Description'],
        order: [['NotID', 'DESC']]
    });
};


module.exports = {
    addNotification,
    deleteNotification,
    editNotification,
    fetchNotificationsByUserId
}