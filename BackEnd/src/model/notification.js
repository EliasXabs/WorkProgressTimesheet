const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const notification = sequelize.define('NOTIFICATION', {
  NotID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: DataTypes.STRING(255),
  Content: DataTypes.STRING(255),
  CreatedIn: DataTypes.DATE
}, {
  timestamps: false,
  tableName: 'NOTIFICATION'
});

module.exports = notification;
