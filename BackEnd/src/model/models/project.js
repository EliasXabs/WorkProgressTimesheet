const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Adjust the path as necessary
module.exports = (sequelize) => {
class Project extends Model {}

Project.init({
  pID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  TeamID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'team',  // Ensure this matches the Sequelize model name
      key: 'tID'
    }
  },
  DepartmentID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'department',  // Ensure this matches the Sequelize model name
      key: 'ID'
    }
  },
  ProjectStatus: DataTypes.STRING(255)
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'PROJECT',
  timestamps: false
});

return Project;
}
