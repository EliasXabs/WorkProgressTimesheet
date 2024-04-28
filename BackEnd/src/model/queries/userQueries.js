const { getModels } = require('../../server');


const addUser = async (username, password, firstname, lastname, dateofbirth, email, number, role) => {
    try {
        const { User } = getModels();
        console.log("Building user ...");
        const user = User.build({ 
            Username: username,
            Password: password,
            FirstName: firstname,
            LastName: lastname,
            DateOfBirth: dateofbirth,
            Email: email,
            ContactNumber: number,
            Role: role
         });
         console.log("user built name", user.Username);
         console.log("Saving user");
         await user.save();
         console.log("User Saved to the database");
         return true;
    }catch (error) {
        return false;
    }

}

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

const deleteUserByUsername = async (username) => {
    console.log("Attempting to delete user:", username);
    if (!username) {
        console.error("Error: Username is undefined");
        return false;
    }
    try {
        const { User } = getModels();
        const result = await User.destroy({
            where: { Username: username }
        });
        if (result > 0) {
            console.log("User successfully deleted.");
            return true;
        } else {
            console.log("No user found with the specified username.");
            return false;
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};



module.exports = {
    findUserByUsername,
    addUser,
    deleteUserByUsername
};
