const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/database'); 

module.exports = (sequelize) => {

    class User extends Model {}
    User.init({
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Username: {
        type: DataTypes.STRING(255),
        unique: true
      },
      Password: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      FirstName: DataTypes.STRING(255),
      LastName: DataTypes.STRING(255),
      DateOfBirth: DataTypes.DATEONLY,
      Joined_In: DataTypes.DATE,
      Email: DataTypes.STRING(255),
      ContactNumber: DataTypes.STRING(20),
      Role: DataTypes.STRING(255),
      Availability: DataTypes.STRING(255)
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'USER',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.Password = await bcrypt.hash(user.Password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('Password')) {
            const salt = await bcrypt.genSalt(10);
            user.Password = await bcrypt.hash(user.Password, salt);
          }
        }
      }
    });
    return User;
}
