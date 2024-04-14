const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjust the path as necessary
module.exports = (sequelize) => {
  class Notification extends Model {}

  Notification.init({
    NotID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Define additional fields as needed
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'NOTIFICATION',
    timestamps: false
  });

  return Notification;
}