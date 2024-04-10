const User = require('./user');
const Department = require('./department');
const Team = require('./team');
const Project = require('./project');
const Task = require('./task');
const Notification = require('./notification');
const WorkSession = require('./workSession');

// Setting up associations
User.hasMany(Department, { foreignKey: 'ManagerID' });
Department.belongsTo(User, { foreignKey: 'ManagerID' });

User.hasMany(Team, { foreignKey: 'TeamLeaderID' });
Team.belongsTo(User, { foreignKey: 'TeamLeaderID' });

Department.hasMany(Team, { foreignKey: 'tDepartmentId' });
Team.belongsTo(Department, { foreignKey: 'tDepartmentId' });

Team.hasMany(Project, { foreignKey: 'TeamID' });
Project.belongsTo(Team, { foreignKey: 'TeamID' });

Department.hasMany(Project, { foreignKey: 'DepartmentID' });
Project.belongsTo(Department, { foreignKey: 'DepartmentID' });

Project.hasMany(Task, { foreignKey: 'TaskProjectID' });
Task.belongsTo(Project, { foreignKey: 'TaskProjectID' });

User.hasMany(Task, { foreignKey: 'UserID' });
Task.belongsTo(User, { foreignKey: 'UserID' });

Notification.hasMany(Task, { foreignKey: 'TaskNotificationID' });
Task.belongsTo(Notification, { foreignKey: 'TaskNotificationID' });

User.hasMany(WorkSession, { foreignKey: 'UserID' });
WorkSession.belongsTo(User, { foreignKey: 'UserID' });

module.exports = {
  User,
  Department,
  Team,
  Project,
  Task,
  Notification,
  WorkSession
};
