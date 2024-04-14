const { getModels } = require('../../server');

const findUserByUsername = async (username) => {
    console.log("Received username:", username);
    if (!username) {
        console.error("Error: Username is undefined");
        return null;
    }
    {
        try {
            const { User } = getModels();
            const user = await User.findOne({ where: { Username: username } });
            return user;
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw error;
        }
    }
};

module.exports = {
    findUserByUsername
};
