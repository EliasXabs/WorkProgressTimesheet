const { addNotification } = require('../model/queries/notificationQueries');

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

module.exports = {
    createNotification
};
