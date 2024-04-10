const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const project = sequelize.define('PROJECT', {
  pID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TeamID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TEAM',
      key: 'tID'
    }
  },
  DepartmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'DEPARTMENT',
      key: 'ID'
    }
  },
  ProjectStatus: DataTypes.STRING(255)
}, {
  timestamps: false,
  tableName: 'PROJECT'
});

module.exports = project;
