const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjust the path as necessary
module.exports = (sequelize) => {
class WorkSession extends Model {}

WorkSession.init({
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',  // Make sure this is correct
      key: 'Id'
    }
  },
  Date: DataTypes.DATEONLY,
  StartTime: DataTypes.DATE,
  BreakTime: DataTypes.TIME,
  EndTime: DataTypes.DATE
}, {
  sequelize,
  modelName: 'WorkSession',
  tableName: 'WORK_SESSION',
  timestamps: false
});
return WorkSession;
}
