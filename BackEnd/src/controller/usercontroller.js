const { deleteUserByUsername } = require('../model/queries/userQueries');

exports.removeUser = async (req, res) => {
    console.log("request to delete User received");

    const { Username } = req.params;

    console.log(Username);

    if (!Username) {
        return res.status(400).json({ error: 'Username is required.' });
    }

    try {
        await deleteUserByUsername(Username);
        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};