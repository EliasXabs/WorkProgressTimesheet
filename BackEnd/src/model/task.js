const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const task = sequelize.define('TASK', {
  TaskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TaskProjectID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'PROJECT',
      key: 'pID'
    }
  },
  TaskDescription: DataTypes.STRING(255),
  TaskNotificationID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'NOTIFICATION',
      key: 'NotID'
    }
  },
  CreatedIn: DataTypes.DATE,
  Deadline: DataTypes.DATEONLY,
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'USER',
      key: 'Id'
    }
  },
  Priority: DataTypes.INTEGER,
  TaskStatus: DataTypes.STRING(255)
}, {
  timestamps: false,
  tableName: 'TASK'
});

module.exports = task;
