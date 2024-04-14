const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjust the path as necessary
module.exports = (sequelize) => {
class Task extends Model {}

Task.init({
  TaskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TaskProjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'project',  // Ensure this matches the Sequelize model name
      key: 'pID'
    }
  },
  TaskDescription: DataTypes.STRING(255),
  TaskNotificationID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'notification',  // Ensure this matches the Sequelize model name
      key: 'NotID'
    }
  },
  CreatedIn: DataTypes.DATE,
  Deadline: DataTypes.DATEONLY,
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',  // Ensure this matches the Sequelize model name
      key: 'Id'
    }
  },
  Priority: DataTypes.INTEGER,
  TaskStatus: DataTypes.STRING(255)
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'TASK',
  timestamps: false
});

return Task;
}
