const bcrypt = require('bcryptjs');
const { findUserByUsername, addUser } = require('../model/queries/userQueries');

exports.login = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await findUserByUsername(Username);
        if (!user) {
            return res.status(401).send({ message: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect credentials.' });
        }

        const userData = {
            Id: user.Id,
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            DateOfBirth: user.DateOfBirth,
            Joined_In: user.Joined_In,
            Email: user.Email,
            ContactNumber: user.ContactNumber,
            Role: user.Role,
            Availability: user.Availability
        };

        res.status(200).send({
            message: 'User authenticated successfully.',
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Server error.' });
    }
};

exports.CreateAccount = async (req, res) => {
    try {
        const { Username, Password, FirstName, LastName, DateOfBirth, Email, Number, Role} = req.body;
        const user = addUser(Username, Password, FirstName, LastName, DateOfBirth, Email, Number, Role);
        if (user){
            res.status(200).send({ message: 'User added successfully'});
        }
        else {
            res.status(500).send({ message: "Database error"});
        }
    } catch (error){
        throw error;
    }
}
