const { User } = require('../index');

const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ where: { Username: username } });
        return user;
    } catch (error) {
        console.error('Error finding user by username:', error);
        throw error;
    }
};

module.exports = {
    findUserByUsername
};
