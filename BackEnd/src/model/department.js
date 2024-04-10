const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const department = sequelize.define('DEPARTMENT', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(255),
    unique: true
  },
  ManagerID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'USER',
      key: 'Id'
    }
  }
}, {
  timestamps: false,
  tableName: 'DEPARTMENT'
});

module.exports = department;
