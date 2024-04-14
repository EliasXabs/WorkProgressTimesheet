const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjust the path as necessary
module.exports = (sequelize) => {
class Team extends Model {}

Team.init({
  tID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tName: DataTypes.STRING(255),
  tDepartmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'department',  // Ensure this matches the Sequelize model name
      key: 'ID'
    }
  },
  TeamLeaderID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',  // Ensure this matches the Sequelize model name
      key: 'Id'
    }
  }
}, {
  sequelize,
  modelName: 'Team',
  tableName: 'TEAM',
  timestamps: false
});

  return Team;
}
