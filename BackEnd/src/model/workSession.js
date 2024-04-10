const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const workSession = sequelize.define('WORK_SESSION', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'USER',
      key: 'Id'
    }
  },
  Date: DataTypes.DATEONLY,
  StartTime: DataTypes.DATE,
  BreakTime: DataTypes.TIME,
  EndTime: DataTypes.DATE
}, {
  timestamps: false,
  tableName: 'WORK_SESSION'
});

module.exports = workSession;
