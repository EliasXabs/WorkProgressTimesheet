const { getSequelize } = require('../config/database');

// Import model definitions
const initUserModel = require('./models/user');
const initDepartmentModel = require('./models/department');
const initTeamModel = require('./models/team');
const initProjectModel = require('./models/project');
const initTaskModel = require('./models/task');
const initNotificationModel = require('./models/notification');
const initWorkSessionModel = require('./models/workSession');

module.exports = async function initModels() {
    const sequelize = getSequelize();  // This fetches the already initialized Sequelize instance

    // Initialize models
    const User = initUserModel(sequelize);
    const Department = initDepartmentModel(sequelize);
    const Team = initTeamModel(sequelize);
    const Project = initProjectModel(sequelize);
    const Task = initTaskModel(sequelize);
    const Notification = initNotificationModel(sequelize);
    const WorkSession = initWorkSessionModel(sequelize);

    // Define associations
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

    Task.hasMany(Notification, { foreignKey: 'TaskID' });
    Notification.belongsTo(Task, { foreignKey: 'TaskID' });    

    User.hasMany(WorkSession, { foreignKey: 'UserID' });
    WorkSession.belongsTo(User, { foreignKey: 'UserID' });

    // Synchronize all models to the database
    try {
        await sequelize.sync({ force: false }); // Set to `true` to recreate tables
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Failed to synchronize models:', error);
    }

    return {
        User,
        Department,
        Team,
        Project,
        Task,
        Notification,
        WorkSession
    };
}
