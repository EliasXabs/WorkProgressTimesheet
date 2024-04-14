const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = (sequelize) => {
    class Department extends Model {}

    // Initialize the Department model
    Department.init({
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
        model: 'user',  
        key: 'id'
        }
    }
    }, {
    sequelize,
    modelName: 'Department',
    tableName: 'DEPARTMENT', 
    timestamps: false
    });

    return Department;
}

