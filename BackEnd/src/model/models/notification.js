const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Notification extends Model {}

  Notification.init({
    NotID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Description: {
      type: DataTypes.STRING(255)
    },
    TaskID: { // This column references the task
      type: DataTypes.INTEGER,
      references: {
        model: 'Task', // This should match the Sequelize model name
        key: 'TaskID'
      }
    }
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'NOTIFICATION',
    timestamps: false
  });

  return Notification;
};
