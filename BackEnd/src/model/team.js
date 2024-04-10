const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const team = sequelize.define('TEAM', {
  tID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tName: DataTypes.STRING(255),
  tDepartmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'DEPARTMENT',
      key: 'ID'
    }
  },
  TeamLeaderID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'USER',
      key: 'Id'
    }
  }
}, {
  timestamps: false,
  tableName: 'TEAM'
});

module.exports = team;
