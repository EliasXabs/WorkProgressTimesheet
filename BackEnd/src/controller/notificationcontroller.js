const { addNotification, deleteNotification } = require('../model/queries/notificationQueries');

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

module.exports = {
    createNotification,
    removeNotification
};
