const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary

const user = sequelize.define('USER', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserName: {
    type: DataTypes.STRING(255),
    unique: true
  },
  FirstName: DataTypes.STRING(255),
  LastName: DataTypes.STRING(255),
  DateOfBirth: DataTypes.DATEONLY,
  Joined_in: DataTypes.DATE,
  Email: DataTypes.STRING(255),
  ContactNumber: DataTypes.STRING(20),
  Role: DataTypes.STRING(255),
  Availability: DataTypes.STRING(255)
}, {
  timestamps: false,
  tableName: 'USER'
});

module.exports = user;
