const user = require('./user');
const department = require('./department');
const team = require('./team');
const project = require('./project');
const task = require('./task');
const notification = require('./notification');
const workSession = require('./workSession');

// Setting up associations
user.hasMany(Department, { foreignKey: 'ManagerID' });
department.belongsTo(User, { foreignKey: 'ManagerID' });

user.hasMany(Team, { foreignKey: 'TeamLeaderID' });
team.belongsTo(User, { foreignKey: 'TeamLeaderID' });

department.hasMany(Team, { foreignKey: 'tDepartmentId' });
team.belongsTo(Department, { foreignKey: 'tDepartmentId' });

team.hasMany(Project, { foreignKey: 'TeamID' });
project.belongsTo(Team, { foreignKey: 'TeamID' });

department.hasMany(Project, { foreignKey: 'DepartmentID' });
project.belongsTo(Department, { foreignKey: 'DepartmentID' });

project.hasMany(Task, { foreignKey: 'TaskProjectID' });
task.belongsTo(Project, { foreignKey: 'TaskProjectID' });

user.hasMany(Task, { foreignKey: 'UserID' });
task.belongsTo(User, { foreignKey: 'UserID' });
notification.hasMany(Task, { foreignKey: 'TaskNotificationID' });
task.belongsTo(Notification, { foreignKey: 'TaskNotificationID' });

user.hasMany(WorkSession, { foreignKey: 'UserID' });
workSession.belongsTo(User, { foreignKey: 'UserID' });

module.exports = {
  user,
  department,
  team,
  project,
  task,
  notification,
  workSession
};
