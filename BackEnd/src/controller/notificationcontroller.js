const { addNotification, deleteNotification, editNotification, fetchNotificationsByUserId } = require('../model/queries/notificationQueries');

const createNotification = async (req, res) => {

    console.log("request recieved");

    const { TaskID, Description } = req.body;

    if (!TaskID || !Description) {
        return res.status(400).json({ error: 'Task ID and description are required.' });
    }

    try {
        const notification = await addNotification(TaskID, Description);
        return res.status(201).json(notification);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const removeNotification = async (req, res) => {
    console.log("request to delete notification received");

    const { notificationId } = req.params;

    console.log(notificationId);

    if (!notificationId) {
        return res.status(400).json({ error: 'Notification ID is required.' });
    }

    try {
        await deleteNotification(notificationId);
        return res.status(200).json({ message: 'Notification deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateNotification = async (req, res) => {
    console.log("Request to update notification received");

    const { notificationId } = req.params;

    const updates = req.body;  // This will contain any number of fields that might need updating

    if (!notificationId) {
        return res.status(400).json({ error: 'Notification ID is required.' });
    }

    // Check if there is at least one field to update
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'At least one field to update is required.' });
    }

    try {
        const updatedNotification = await editNotification(notificationId, updates);
        return res.status(200).json(updatedNotification);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllNotificationsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const notifications = await fetchNotificationsByUserId(userId);

        const result = notifications.map(notification => ({
            notificationId: notification.NotID,
            description: notification.Description,
            taskId: notification.Task.TaskID,
            taskName: notification.Task.TaskDescription,
            projectId: notification.Task.Project.pID,
            projectName: notification.Task.Project.ProjectName // Assuming there's a ProjectName attribute
        }));

        res.json(result);
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createNotification,
    removeNotification,
    updateNotification,
    getAllNotificationsByUserId
};
