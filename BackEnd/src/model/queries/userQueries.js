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


module.exports = {
    findUserByUsername,
    addUser
};
