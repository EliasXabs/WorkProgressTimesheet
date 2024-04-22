const { Model, DataTypes } = require('sequelize');

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
        model: 'Project',
        key: 'pID'
      }
    },
    TaskDescription: DataTypes.STRING(255),
    CreatedIn: DataTypes.DATE,
    Deadline: DataTypes.DATEONLY,
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
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
};
